Core Task: You are a senior software developer specializing in front-end components for business process automation. Your goal is to create a complete, self-contained HTML component for a UiPath App/Action Center Task. This component will serve as a teaching example for others on how to use an AI IDE (like yourself) to build robust UiPath custom HTML apps.

To build the code for a **Resolution Inspection** task, you'll need to fill out the provided prompt template with the specifics of the task description. Here is the completed prompt for Cursor to build the code.

```
Scenario for the App: The application is for a **Physical Asset Inspection**. A user will receive a task with details about an **asset**. They must review the information, potentially add notes, and then make a decision to either **Resolve** or **Escalate** the discrepancy.

---

Technical and Pedagogical Requirements:

Strict Adherence to Documentation: You must use the provided UiPath_Compatibility_Analysis.md document as your single source of truth. Your code must demonstrate an expert-level understanding of all key rules and patterns, including:

* No use of blocked browser APIs (window.alert, etc.).
* Implementing a custom `showMessage` function for alerts and confirmations.
* A robust, multi-fallback initialization pattern.
* Safe DOM element access and event listener setup (always check for existence).
* Use the provided `setVariable` and `getVariable` communication functions.

Bidirectional Variable Communication: The app must demonstrate seamless data flow between the UiPath environment and the HTML component.

Receive from UiPath: The component should load initial values from the following UiPath variables:
* `assetID` (Text)
* `assetType` (Text)
* `discrepancyType` (Text)
* `location` (Text)
* `initialNotes` (Text)
* `assetPhotoUrl` (Text)

Send to UiPath: The component must push updated values to the following UiPath variables:
* `finalDecision` (Text)
* `resolutionNotes` (Text)
* `updatedSerialNumber` (Text)
* `finalStatus` (Text)

UI/UX Design: The design should be a clean, modern, and professional dark-mode theme suitable for a business application. Use a minimal, utility-first CSS approach, but embed all styles directly within the HTML to ensure the component is self-contained. The layout should be easy to read and intuitive to navigate. Use clear labels and a hierarchical structure.

Application Logic:

* The component should display the received **asset** details in a clear, read-only format. It should have sections for "Asset Details" and "Evidence."
* Include a text area for the user to enter their **resolutionNotes**. This text area should update the UiPath variable only when the user's focus leaves the field (on blur), demonstrating an efficient approach for long-form input.
* A user should be able to input a new serial number into a text field.
* The component should have two prominent action buttons, **Resolve** and **Escalate**, that are positioned at the bottom of the form.
* Clicking either button must trigger a custom confirmation modal before setting the **finalDecision** variable.
* **The app should have conditional logic to display an "Upload Photos" button only if the discrepancyType is "Missing Photos". If the `discrepancyType` is "Incorrect Serial Number," a text field for `updatedSerialNumber` should appear.**

Output Format (Pedagogical):

* Provide the complete, production-ready HTML, CSS, and JavaScript in a new folder called `PhysicalAssetInspection` with each individual file created: `index.html`, `styles.css`, `script.js`.
* The comments should not only explain what the code does, but why it's written that way, explicitly referencing the rules from the `UiPath_Compatibility_Analysis.md` document (e.g., "Using `if (element)` check to follow the safe DOM access rule.").
* Conclude with a brief summary of the key learning points demonstrated in the code.
```