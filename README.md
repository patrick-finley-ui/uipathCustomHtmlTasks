### Transferring the Code to UiPath Action Center

Once the AI IDE has provided the complete HTML, CSS, and JavaScript code in separate blocks, follow these steps to deploy it within UiPath.

***

### Step 1: Preview and Debug the App 🧪

Before transferring the code to UiPath, you can **preview and debug** the app to ensure it works as expected. This saves time and helps you identify issues quickly.

* **Using an IDE Extension:** If you're using an IDE like **VS Code** or **Cursor**, you can use a live preview extension (e.g., Live Server) or the built-in `Show Preview` feature. This renders your HTML file in a browser, allowing you to see the layout and design.
* **Debugging in Chrome:**
    1.  Save your HTML, CSS, and JavaScript code as a single `.html` file on your computer.
    2.  Open the file in the Chrome browser.
    3.  Right-click anywhere on the page and select **Inspect** to open the Developer Tools.
    4.  Go to the **Console** tab to see any JavaScript errors or `console.log` messages. This is where you can test the logic before putting it into UiPath.

***

### Step 2: Open the UiPath App

Navigate to the **UiPath App** in which you want to host the custom component. Go to the page or form where the component will be placed.

***

### Step 3: Add the Custom HTML Component

From the left-hand panel in the App designer, drag and drop a **Custom HTML** component onto your page. Position the component where you want your application to appear. 

***

### Step 4: Add CSS and JavaScript

1.  **Add CSS:** With the Custom HTML component selected, go to the right-hand **Properties** panel. Find the **CSS** section and paste the entire CSS code block.
2.  **Add JavaScript:** Still in the **Properties** panel, find the **JS** section and paste the entire JavaScript code block.

***

### Step 5: Paste the HTML Body Content

Find the **Source** field in the Properties panel. Copy the content inside the `<body>` tag from the AI IDE's output and paste it here. **Important:** Remove any `<script>` tags that link to external JavaScript files (e.g., `<script src="script.js">`). The component handles JavaScript linking for you in the dedicated JS field.

***

### Step 6: Link External Resources 🔗

In the **Properties** panel, use the **External Scripts** and **External Stylesheets** sections to add URLs for any external libraries.

***

### Step 7: Configure App Variables

This is a crucial step to link the HTML component to your UiPath workflow. The `App.setVariable` and `App.getVariable` functions can only interact with **App Variables**, not Action Schema variables directly. Therefore, you must create App Variables to serve as an intermediary.

1.  In the UiPath Apps designer, go to the **Variables** section.
2.  Create a new **App variable** for each variable you want to pass in or out. This must match the field names exactly that you passed into the cursor prompt for the fields.
3.  If you don't know what the fields are, search in the javascript for where the setVariable function is used. 

***

### Step 8: Configure for Action Center (if applicable)

If this component is part of an **Action Center task**, you must first create an Action Schema and then manage the data flow using a combination of the page's `On Load` event and a UiPath button.

1.  **Create an Action Schema:** In your UiPath process, define a data structure that mirrors the app variables you created.
    * **Variables Passed In:** For data coming from the workflow into the app, define a schema that includes these variables (e.g., `claimId`, `policyStatus`).
    * **Variables Passed Out:** For data going from the app back to the workflow, define a schema for the output variables (e.g., `finalDecision`, `reviewerComments`).

2.  **Passing Data In (on Page Load):**
    * Go to the **Page**'s properties by selecting the page itself (not a component).
    * In the **Events** tab, find the `On Load` event.
    * Add a `Set Value` rule for each variable you are passing into the app from the Action Schema. Set the **App variable** equal to the **Action Schema variable** (e.g., `App.claimId = ActionSchema.claimId`). This ensures your HTML component's input variables are populated with the correct data when the user opens the task.

3.  **Passing Data Out (on Submission): a UiPath Button:**
    * Place a standard **UiPath Button** outside of your Custom HTML component. This button will be your submit button.
    * In the button's **Events** panel, configure the `Click` event.
    * Add a `Set Value` rule for each variable you want to pass out. Set the **Action Schema variable** equal to the corresponding **App variable** (e.g., `ActionSchema.finalDecision = App.finalDecision`). This correctly packages the data from your App Variables for the Orchestrator flow.


### Step 9: Test and Publish the Action Task

Finally, you need to test the end-to-end process by connecting your app to a UiPath Orchestrator workflow and running the task.

1.  **Add App to a Maestro /RPA Workflow:** In your UiPath Studio workflow, use the **Create Form Task** or **Wait for Form Task** activity.
2.  **Hook up the Action Schema:** In the activity's properties, set the `ActionSchema` variable from your workflow to the corresponding variable in the action activity. This links the app to the data model.
3.  **Run and Submit the Task:** Run the workflow from Orchestrator. The Action Task will be created. Open the task in Action Center or the Mobile App.
4.  **Verify Data Flow:**
    * **Check Input:** Verify that the data passed into the app (e.g., `claimId`) is correctly displayed by your custom HTML component.
    * **Check Output:** Interact with your app, make a decision, and click the UiPath button. Submit the task and then check the workflow's output to confirm that the data (e.g., `finalDecision`) was passed out correctly.
