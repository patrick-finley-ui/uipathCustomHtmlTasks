/**
 * Physical Asset Inspection Component for UiPath
 * Following UiPath_Compatibility_Analysis.md requirements
 * 
 * Key Learning Points Demonstrated:
 * - Robust multi-fallback initialization pattern for UiPath compatibility
 * - Safe DOM element access with existence checks
 * - Bidirectional variable communication with UiPath
 * - Custom alert system (no browser APIs)
 * - Smart event handling (blur for text, input for numbers, change for dropdowns)
 * - File upload with 1MB size limit enforcement
 * - Conditional UI logic based on discrepancy type
 */

// Global elements object for safe DOM access
const elements = {};

// Application state
let currentDecision = null;
let pendingAction = null;

/**
 * UiPath Variable Communication Functions
 * Following the robust pattern from UiPath_Compatibility_Analysis.md
 */
function setVariable(variableName, value) {
    try {
        // Check if we're in UiPath environment - following safe environment detection
        if (typeof App !== 'undefined' && App.setVariable) {
            App.setVariable(variableName, value);
            console.log(`UiPath variable set: ${variableName} = ${value}`);
        } else {
            console.log(`Variable would be set: ${variableName} = ${value}`);
        }
    } catch (error) {
        console.error(`Error setting UiPath variable ${variableName}:`, error);
    }
}

function getVariable(variableName) {
    try {
        // Check if we're in UiPath environment - following safe environment detection
        if (typeof App !== 'undefined' && App.getVariable) {
            return App.getVariable(variableName);
        } else {
            console.log(`Variable would be retrieved: ${variableName}`);
            return null;
        }
    } catch (error) {
        console.error(`Error getting UiPath variable ${variableName}:`, error);
        return null;
    }
}

/**
 * Custom Alert System
 * Replaces window.alert() which is blocked in UiPath
 * Following UiPath_Compatibility_Analysis.md requirements
 */
function showMessage(message) {
    const alertOverlay = document.getElementById('alertOverlay');
    const alertMessage = document.getElementById('alertMessage');
    
    if (alertOverlay && alertMessage) {
        alertMessage.textContent = message;
        alertOverlay.style.display = 'flex';
    } else {
        console.error('Alert elements not found');
    }
}

/**
 * Custom Confirmation Modal
 * Replaces window.confirm() which is blocked in UiPath
 * Following UiPath_Compatibility_Analysis.md requirements
 */
function showConfirmationModal(title, message, action) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    if (modalOverlay && modalTitle && modalMessage) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        pendingAction = action;
        modalOverlay.style.display = 'flex';
    } else {
        console.error('Modal elements not found');
    }
}

/**
 * Initialize DOM Elements with Error Handling
 * Following the safe DOM access pattern from UiPath_Compatibility_Analysis.md
 */
function initializeElements() {
    try {
        // Asset detail elements
        elements.assetID = document.getElementById('assetID');
        elements.assetType = document.getElementById('assetType');
        elements.discrepancyType = document.getElementById('discrepancyType');
        elements.location = document.getElementById('location');
        elements.assetPhoto = document.getElementById('assetPhoto');
        elements.noPhotoMessage = document.getElementById('noPhotoMessage');
        
        // Conditional elements
        elements.uploadSection = document.getElementById('uploadSection');
        elements.uploadBtn = document.getElementById('uploadBtn');
        elements.photoUpload = document.getElementById('photoUpload');
        elements.serialNumberGroup = document.getElementById('serialNumberGroup');
        elements.updatedSerialNumber = document.getElementById('updatedSerialNumber');
        
        // Form elements
        elements.resolutionNotes = document.getElementById('resolutionNotes');
        
        // Action buttons
        elements.resolveBtn = document.getElementById('resolveBtn');
        elements.escalateBtn = document.getElementById('escalateBtn');
        
        // Modal elements
        elements.modalOverlay = document.getElementById('modalOverlay');
        elements.modalCancel = document.getElementById('modalCancel');
        elements.modalConfirm = document.getElementById('modalConfirm');
        
        // Alert elements
        elements.alertOverlay = document.getElementById('alertOverlay');
        elements.alertOk = document.getElementById('alertOk');
        
        console.log('DOM elements initialized successfully');
        return true;
    } catch (error) {
        console.error('Error initializing DOM elements:', error);
        return false;
    }
}

/**
 * Setup Event Listeners with Validation
 * Following the safe event listener pattern from UiPath_Compatibility_Analysis.md
 */
function setupEventListeners() {
    // Check if critical elements exist before adding listeners
    if (!elements.resolutionNotes) {
        console.error('resolutionNotes element not found');
        return;
    }
    if (!elements.resolveBtn) {
        console.error('resolveBtn element not found');
        return;
    }
    if (!elements.escalateBtn) {
        console.error('escalateBtn element not found');
        return;
    }

    // Resolution notes - Update on blur for performance (following UiPath best practices)
    elements.resolutionNotes.addEventListener('blur', function(e) {
        const notesValue = e.target.value.trim();
        setVariable('resolutionNotes', notesValue);
        console.log('Resolution notes updated:', notesValue);
    });

    // Updated serial number - Update on input for real-time feedback
    if (elements.updatedSerialNumber) {
        elements.updatedSerialNumber.addEventListener('input', function(e) {
            const serialValue = e.target.value.trim();
            setVariable('updatedSerialNumber', serialValue);
            console.log('Updated serial number:', serialValue);
        });
    }

    // Action buttons with confirmation modals
    elements.resolveBtn.addEventListener('click', function() {
        showConfirmationModal(
            'Resolve Discrepancy',
            'Are you sure you want to resolve this asset discrepancy? This action will mark the issue as resolved.',
            'resolve'
        );
    });

    elements.escalateBtn.addEventListener('click', function() {
        showConfirmationModal(
            'Escalate Discrepancy',
            'Are you sure you want to escalate this asset discrepancy? This will send it to a supervisor for review.',
            'escalate'
        );
    });

    // Upload button
    if (elements.uploadBtn && elements.photoUpload) {
        elements.uploadBtn.addEventListener('click', function() {
            elements.photoUpload.click();
        });

        // File upload with size validation (following UiPath 1MB limit)
        elements.photoUpload.addEventListener('change', function(e) {
            handleFileUpload(e.target.files);
        });
    }

    // Modal event listeners
    if (elements.modalCancel) {
        elements.modalCancel.addEventListener('click', function() {
            elements.modalOverlay.style.display = 'none';
            pendingAction = null;
        });
    }

    if (elements.modalConfirm) {
        elements.modalConfirm.addEventListener('click', function() {
            processDecision(pendingAction);
            elements.modalOverlay.style.display = 'none';
            pendingAction = null;
        });
    }

    // Alert event listeners
    if (elements.alertOk) {
        elements.alertOk.addEventListener('click', function() {
            elements.alertOverlay.style.display = 'none';
        });
    }

    console.log('Event listeners setup successfully');
}

/**
 * Handle File Upload with Size Validation
 * Following UiPath_Compatibility_Analysis.md requirements for 1MB limit
 */
function handleFileUpload(files) {
    if (!files || files.length === 0) return;

    let validFiles = [];
    let invalidFiles = [];

    // Check each file for size limit (UiPath requirement: 1MB max)
    for (let file of files) {
        if (file.size > 1024 * 1024) {
            invalidFiles.push(file.name);
        } else {
            validFiles.push(file);
        }
    }

    // Show error message for oversized files
    if (invalidFiles.length > 0) {
        showMessage(`Files too large (max 1MB): ${invalidFiles.join(', ')}`);
    }

    // Process valid files
    if (validFiles.length > 0) {
        console.log(`Processing ${validFiles.length} valid files`);
        // In a real implementation, you would upload these files
        // For now, we'll just show a success message
        showMessage(`Successfully uploaded ${validFiles.length} file(s)`);
        
        // Update UiPath variable to indicate photos were uploaded
        setVariable('photosUploaded', 'true');
    }
}

/**
 * Process User Decision
 * Sets the final decision variable for UiPath
 */
function processDecision(action) {
    if (!action) return;

    // Set the decision variable for UiPath
    setVariable('finalDecision', action);
    
    // Set final status based on decision
    const status = action === 'resolve' ? 'Resolved' : 'Escalated';
    setVariable('finalStatus', status);
    
    // Update UI to show decision was made
    const statusBadge = document.getElementById('statusBadge');
    if (statusBadge) {
        statusBadge.textContent = status;
        statusBadge.style.background = action === 'resolve' 
            ? 'linear-gradient(135deg, #28a745, #20c997)'
            : 'linear-gradient(135deg, #dc3545, #fd7e14)';
    }

    // Disable action buttons after decision
    if (elements.resolveBtn) elements.resolveBtn.disabled = true;
    if (elements.escalateBtn) elements.escalateBtn.disabled = true;

    console.log(`Decision processed: ${action}`);
    showMessage(`Asset discrepancy ${action}d successfully`);
}

/**
 * Update Conditional UI Based on Discrepancy Type
 * Following the conditional logic requirement
 */
function updateConditionalUI(discrepancyType) {
    if (!discrepancyType) return;

    // Show upload section only if discrepancy type is "Missing Photos"
    if (elements.uploadSection) {
        if (discrepancyType.toLowerCase().includes('missing photos') || 
            discrepancyType.toLowerCase().includes('missing photo')) {
            elements.uploadSection.style.display = 'block';
        } else {
            elements.uploadSection.style.display = 'none';
        }
    }

    // Show serial number field only if discrepancy type is "Incorrect Serial Number"
    if (elements.serialNumberGroup) {
        if (discrepancyType.toLowerCase().includes('incorrect serial') || 
            discrepancyType.toLowerCase().includes('serial number')) {
            elements.serialNumberGroup.style.display = 'block';
        } else {
            elements.serialNumberGroup.style.display = 'none';
        }
    }

    console.log(`Conditional UI updated for discrepancy type: ${discrepancyType}`);
}

/**
 * Load Initial Values from UiPath
 * Following the bidirectional variable communication pattern
 */
async function loadInitialValues() {
    try {
        if (typeof App !== 'undefined' && App.getVariable) {
            // Load asset details from UiPath variables
            const assetID = await App.getVariable('assetID');
            const assetType = await App.getVariable('assetType');
            const discrepancyType = await App.getVariable('discrepancyType');
            const location = await App.getVariable('location');
            const initialNotes = await App.getVariable('initialNotes');
            const assetPhotoUrl = await App.getVariable('assetPhotoUrl');

            // Update UI with loaded values
            if (elements.assetID && assetID) elements.assetID.textContent = assetID;
            if (elements.assetType && assetType) elements.assetType.textContent = assetType;
            if (elements.discrepancyType && discrepancyType) {
                elements.discrepancyType.textContent = discrepancyType;
                updateConditionalUI(discrepancyType);
            }
            if (elements.location && location) elements.location.textContent = location;
            if (elements.resolutionNotes && initialNotes) {
                elements.resolutionNotes.value = initialNotes;
            }

            // Handle asset photo
            if (assetPhotoUrl && elements.assetPhoto && elements.noPhotoMessage) {
                elements.assetPhoto.src = assetPhotoUrl;
                elements.assetPhoto.style.display = 'block';
                elements.noPhotoMessage.style.display = 'none';
            }

            console.log('Initial values loaded from UiPath');
        } else {
            console.log('Not in UiPath environment, using default values');
            // Set some default values for testing
            if (elements.assetID) elements.assetID.textContent = 'AST-001';
            if (elements.assetType) elements.assetType.textContent = 'Laptop Computer';
            if (elements.discrepancyType) {
                elements.discrepancyType.textContent = 'Missing Photos';
                updateConditionalUI('Missing Photos');
            }
            if (elements.location) elements.location.textContent = 'Building A, Floor 2';
        }
    } catch (error) {
        console.error('Error loading initial values:', error);
    }
}

/**
 * Initialize UiPath Variable Listeners
 * Following the bidirectional variable communication pattern
 */
function initializeUiPathVariableListeners() {
    try {
        // Check if we're in UiPath environment
        if (typeof App !== 'undefined' && App.onVariableChange) {
            // Listen for variable changes from UiPath
            App.onVariableChange('assetID', value => {
                console.log('AssetID variable changed:', value);
                if (elements.assetID && elements.assetID.textContent !== value) {
                    elements.assetID.textContent = value || 'Loading...';
                }
            });

            App.onVariableChange('discrepancyType', value => {
                console.log('DiscrepancyType variable changed:', value);
                if (elements.discrepancyType && elements.discrepancyType.textContent !== value) {
                    elements.discrepancyType.textContent = value || 'Loading...';
                    updateConditionalUI(value);
                }
            });

            console.log('UiPath variable listeners initialized successfully');
        } else {
            console.log('Not in UiPath environment, skipping variable listeners');
        }
    } catch (error) {
        console.error('Error initializing UiPath variable listeners:', error);
    }
}

/**
 * Robust Multi-Fallback Initialization Pattern
 * Following UiPath_Compatibility_Analysis.md requirements
 */
function initializeApplication() {
    console.log('Initializing Physical Asset Inspection application...');
    
    // Try multiple initialization methods for UiPath compatibility
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        // DOM is already loaded
        initializeApp();
    }
    
    // Fallback: try again after a short delay
    setTimeout(() => {
        if (!document.body.querySelector('.container')) {
            console.log('Retrying initialization...');
            initializeApp();
        }
    }, 100);
    
    // Additional fallback for UiPath
    setTimeout(() => {
        if (!document.body.querySelector('.container')) {
            console.log('Final initialization attempt...');
            initializeApp();
        }
    }, 500);
}

/**
 * Main Application Initialization
 * Following the robust initialization pattern
 */
function initializeApp() {
    console.log('Initializing app...');
    
    if (!initializeElements()) {
        console.error('Failed to initialize DOM elements');
        return;
    }
    
    try {
        setupEventListeners();
        loadInitialValues();
        initializeUiPathVariableListeners();
        console.log('Physical Asset Inspection application initialized successfully');
    } catch (error) {
        console.error('Error during app initialization:', error);
    }
}

// Start the application using the robust initialization pattern
initializeApplication();
