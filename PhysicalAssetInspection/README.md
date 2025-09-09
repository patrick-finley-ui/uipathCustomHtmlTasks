# Physical Asset Inspection - UiPath Custom HTML Component

## Overview
This is a complete, self-contained HTML component for UiPath App/Action Center that demonstrates best practices for building robust custom HTML applications. The component handles Physical Asset Inspection tasks with conditional UI logic and bidirectional variable communication.

## Key Learning Points Demonstrated

### 1. UiPath Compatibility Requirements
- **No Browser APIs**: Uses custom `showMessage()` and `showConfirmationModal()` instead of `window.alert()` and `window.confirm()`
- **Safe DOM Access**: All element access includes existence checks (`if (element)`) before use
- **File Size Limits**: Enforces 1MB limit on file uploads as required by UiPath
- **Proper Z-Index**: Modals use z-index 9999, alerts use 10000
- **Touch Targets**: All interactive elements meet 44px minimum size requirement

### 2. Robust Initialization Pattern
- **Multi-Fallback Initialization**: Uses multiple fallback methods for UiPath compatibility
- **Safe Element Initialization**: Validates all DOM elements before use
- **Error Handling**: Comprehensive try-catch blocks throughout
- **Console Logging**: Detailed logging for debugging in UiPath environment

### 3. Bidirectional Variable Communication
- **Receive from UiPath**: Loads initial values from UiPath variables on startup
- **Send to UiPath**: Updates UiPath variables on user interactions
- **Variable Listeners**: Uses `App.onVariableChange()` for real-time updates
- **Environment Detection**: Safely checks for UiPath environment before using App APIs

### 4. Smart Event Handling
- **Text Areas**: Use `blur` events for performance (not every keystroke)
- **Number Inputs**: Use `input` events for real-time updates
- **Dropdowns**: Use `change` events for immediate updates
- **Decision Buttons**: Set single decision variables on user actions

### 5. Conditional UI Logic
- **Upload Photos**: Only shows when `discrepancyType` is "Missing Photos"
- **Serial Number Field**: Only shows when `discrepancyType` is "Incorrect Serial Number"
- **Dynamic Updates**: UI adapts based on received data

## UiPath Variables

### Received from UiPath
- `assetID` (Text) - Asset identifier
- `assetType` (Text) - Type of asset
- `discrepancyType` (Text) - Type of discrepancy found
- `location` (Text) - Asset location
- `initialNotes` (Text) - Pre-filled notes
- `assetPhotoUrl` (Text) - URL to asset photo

### Sent to UiPath
- `finalDecision` (Text) - "resolve" or "escalate"
- `resolutionNotes` (Text) - User's resolution notes
- `updatedSerialNumber` (Text) - Corrected serial number (if applicable)
- `finalStatus` (Text) - "Resolved" or "Escalated"
- `photosUploaded` (Text) - "true" if photos were uploaded

## File Structure
```
PhysicalAssetInspection/
├── index.html      # Main HTML structure (no <html> or <head> tags)
├── styles.css      # Dark mode professional styling
├── script.js       # JavaScript with UiPath communication
└── README.md       # This documentation
```

## Usage in UiPath
1. Upload the entire `PhysicalAssetInspection` folder to UiPath
2. Set the required UiPath variables before launching the component
3. The component will automatically load initial values and display the inspection interface
4. Users can review asset details, add notes, and make resolution decisions
5. All user interactions are automatically communicated back to UiPath

## Testing Checklist
- [x] All file uploads check for 1MB limit
- [x] No `window.alert()` or similar browser APIs
- [x] All DOM elements checked before use
- [x] Event listeners only attached to existing elements
- [x] Z-index values set for modals/overlays
- [x] Touch targets are 44px minimum
- [x] Variable communication properly implemented
- [x] Bidirectional variable sync working
- [x] Text inputs use blur events for performance
- [x] Number inputs update in real-time
- [x] Decision variables set on user actions

## Code Comments Reference UiPath Rules
The code includes extensive comments that explicitly reference the rules from `UiPath_Compatibility_Analysis.md`, such as:
- "Using `if (element)` check to follow the safe DOM access rule"
- "Following UiPath_Compatibility_Analysis.md requirements for 1MB limit"
- "Following the robust initialization pattern from UiPath_Compatibility_Analysis.md"

This makes the code an excellent teaching example for understanding UiPath custom HTML development best practices.
