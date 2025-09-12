


### Why Create a AI-Generated Custom HTML Component App? 🤖
Creating dynamic user experiences for human-in-the-loop tasks in Action Center is crucial for selling a modern, intuitive UX that gets people excited about review agents and automation outputs. While this has traditionally required deep knowledge of HTML, CSS, and JavaScript, using an AI IDE like **Cursor** changes the game. It allows you to build these components faster than ever, with **almost no coding knowledge**. The AI acts as your expert front-end developer, translating your requirements directly into a functional, professional-looking application.

**Limitations: ** This does not work currently with passing in Apps File and Passing out uploaded Documents. If you'd like to display images, use a public URL. If you want to pass documents, you'll have to fake it or use a upload document control outside of the custom html.

***

### What You Need to Get Started 🚀
To get started, you need a focused understanding of what data you want to present, what data needs to be passed in, and what data needs to be passed out. This structured approach is your blueprint for the AI.

1.  **Data to Present:** Determine what information the user needs to see. This data will be passed **in** from your UiPath workflow.
2.  **User Inputs:** Define what actions or inputs the user needs to make. This could be a decision (`Approve`/`Reject`), comments in a text box, or a new value in a number field.
3.  **Data to Pass Out:** Identify the specific data you need to collect from the user's inputs and pass **out** to the UiPath workflow.


### Getting Your Environment Ready

This section will help you set up your workspace and get the necessary files to begin prompting.

1.  **Download and Install an AI IDE:**
    * **Cursor:** A standalone AI-first code editor designed to work seamlessly with large language models.
    * **VS Code with Extensions:** Install Visual Studio Code and add extensions like **GitHub Copilot Chat** or **Amazon Q**.
    * **Claude Code:**
    * **Gemini/Chatgpt: Easiest to copy the documentation from: UiPath_Compatibility_Analysis.md and append to the prompt. Or take existing example and ask chatbot to adjust**

2.  **Get the Project Files:**
    * Navigate to the GitHub repository that contains this project's files.
    * Download the repository as a `.zip` file.
    * Unzip the folder to a location on your computer.

3.  **Open the Project:**
    * Open your chosen AI IDE.
    * Go to **File** > **Open Folder** and select the unzipped project folder.

4.  **Customize the Prompt:**
    * Inside the project folder, you will find a file named `promptExample.md`.
    * Open this file. It contains the prompt template you'll use.
    * **Adjust the template** by filling in the details for your specific task, including the name of the user, the variables you need to pass in and out, and the actions required. USE AI to help you re-write the prompt for you if you're feeling lazy!

***

### Building the App with the AI Agent

This is where the magic happens. You'll use your prepared prompt to direct the AI agent in building the component.

1.  **Start the Agent:** Open the AI chat panel within your IDE. In Cursor, for instance, you'll use the main chat window.
2.  **Copy and Paste the Prompt:** Copy the customized prompt from your `promptExample.md` file. Paste the entire content into the chat and press Enter. The AI will start building the code for your component.
3.  **Watch the Code Build:** The AI will generate the HTML, CSS, and JavaScript files directly in your project folder, adhering to the structure and rules outlined in the `UiPath_Compatibility_Analysis.md` document.
4.  **Iterate and Refine:** The first version may not be perfect. Use the chat to provide iterative instructions to the agent.
    * **Example 1 (Design change):** "The buttons are too small. Make them more prominent and give them a green background for 'Approve' and a red background for 'Deny'."
    * **Example 2 (Functionality change):** "Add an input field for the user to provide a reason for the denial. The field should be required only when the 'Deny' button is clicked."
    * **Example 3 (Bug fix):** "The text area isn't updating the `reviewerComments` variable correctly. Fix the event listener to ensure it updates on blur."
5.  **Finalize the Code:** Once you're satisfied with the design and functionality, ask the AI to provide the complete, final code in a single, well-commented block, organized by HTML, CSS, and JavaScript. This output is what you'll use to paste directly into UiPath Apps.


### Transferring the Code to UiPath Action Center
Once the AI IDE has provided the complete HTML, CSS, and JavaScript code in separate blocks, follow these steps to deploy it within UiPath.
### Step 1: Preview and Debug the App 🧪

Before transferring the code to UiPath, you can **preview and debug** the app to ensure it works as expected. This saves time and helps you identify issues quickly.

* **Using an IDE Extension:** If you're using an IDE like **VS Code** or **Cursor**, you can use a live preview extension (e.g., Live Server) or the built-in `Show Preview` feature. This renders your HTML file in a browser, allowing you to see the layout and design.
* **Debugging in Chrome:**
    1.  Save your HTML, CSS, and JavaScript code as a single `.html` file on your computer.
    2.  Open the file in the Chrome browser.
    3.  Right-click anywhere on the page and select **Inspect** to open the Developer Tools.
    4.  Go to the **Console** tab to see any JavaScript errors or `console.log` messages. This is where you can test the logic before putting it into UiPath.
  * **Still running into issues?:**
    1. Look at some of the examples like Depot Review and Journal Voucher Review and ask the agent to review the html/javascript in those to fix issues


***

### Step 2: Open the UiPath App

Navigate to the **UiPath App** in which you want to host the custom component. Go to the page or form where the component will be placed.

***

### Step 3: Add the Custom HTML Component

From the left-hand panel in the App designer, drag and drop a **Custom HTML** component onto your page. Position the component where you want your application to appear. 
<img width="924" height="1243" alt="image" src="https://github.com/user-attachments/assets/382cc364-109f-42aa-8d41-26cf848fe667" />

***

### Step 4: Add CSS and JavaScript

1.  **Add CSS:** With the Custom HTML component selected, go to the right-hand **Properties** panel. Find the **CSS** section and paste the entire CSS code block.
2.  **Add JavaScript:** Still in the **Properties** panel, find the **JS** section and paste the entire JavaScript code block.
<img width="3478" height="1926" alt="image" src="https://github.com/user-attachments/assets/7291ae3b-4ace-45e1-be79-d854bc2d6266" />


***

### Step 5: Paste the HTML Body Content

Find the **Source** field in the Properties panel. Copy the content inside the `<body>` tag from the AI IDE's output and paste it here. **Important:** Remove any `<script>` tags that link to external JavaScript files (e.g., `<script src="script.js">`). The component handles JavaScript linking for you in the dedicated JS field.

***

### Step 6: Link External Resources 🔗

In the **Properties** panel, use the **External Scripts** and **External Stylesheets** sections to add URLs for any external libraries.
<img width="1060" height="416" alt="image" src="https://github.com/user-attachments/assets/f437b79c-d688-400e-90a5-63cc457727bb" />
<img width="3438" height="1143" alt="image" src="https://github.com/user-attachments/assets/73fb20dc-8a54-4aa1-9bda-7a7d7f4ebce3" />

***

### Step 7: Configure App Variables

This is a crucial step to link the HTML component to your UiPath workflow. The `App.setVariable` and `App.getVariable` functions can only interact with **App Variables**, not Action Schema variables directly. Therefore, you must create App Variables to serve as an intermediary.

1.  In the UiPath Apps designer, go to the **Variables** section.
2.  Create a new **App variable** for each variable you want to pass in or out. ***This must match the field names exactly that you passed into the cursor prompt for the fields. MATCH THE FIELDS EXACTLY***
3.  If you don't know what the fields are, search in the javascript for where the setVariable function is used. 
<img width="885" height="1479" alt="image" src="https://github.com/user-attachments/assets/7bee2772-c26b-4edc-bd8d-ea1f6953b2f1" />

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
<img width="2958" height="2067" alt="image" src="https://github.com/user-attachments/assets/54a88255-177e-4fde-a193-a07fb7433b2c" />

3.  **Passing Data Out (on Submission): a UiPath Button:**
    * Place a standard **UiPath Button** outside of your Custom HTML component. This button will be your submit button.
    * In the button's **Events** panel, configure the `Click` event.
    * Add a `Set Value` rule for each variable you want to pass out. Set the **Action Schema variable** equal to the corresponding **App variable** (e.g., `ActionSchema.finalDecision = App.finalDecision`). This correctly packages the data from your App Variables for the Orchestrator flow.

<img width="3780" height="2002" alt="image" src="https://github.com/user-attachments/assets/e203941e-0e69-4a6b-ae97-42ba33c63ee0" />

<img width="1407" height="1437" alt="image" src="https://github.com/user-attachments/assets/d78fadca-8acd-43b6-aa03-f08094ddc18e" />


### Step 9: Test and Publish the Action Task

Finally, you need to test the end-to-end process by connecting your app to a UiPath Orchestrator workflow and running the task.

1.  **Add App to a Maestro /RPA Workflow:** In your UiPath Studio workflow, use the **Create Form Task** or **Wait for Form Task** activity.
2.  **Hook up the Action Schema:** In the activity's properties, set the `ActionSchema` variable from your workflow to the corresponding variable in the action activity. This links the app to the data model.
3.  **Run and Submit the Task:** Run the workflow from Orchestrator. The Action Task will be created. Open the task in Action Center or the Mobile App.
4.  **Verify Data Flow:**
    * **Check Input:** Verify that the data passed into the app (e.g., `claimId`) is correctly displayed by your custom HTML component.
    * **Check Output:** Interact with your app, make a decision, and click the UiPath button. Submit the task and then check the workflow's output to confirm that the data (e.g., `finalDecision`) was passed out correctly.
  
    
### Step 10:Add your task to repo

Finally, once you have your task finished and working, please upload make add your task package (html, css, js) and any prompts that you found worked well to the repo. This will help the team build out better tasks, reuse examples, and develop better prompts
  

