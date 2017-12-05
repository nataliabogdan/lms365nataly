1. Install Node.js [http://nodejs.org/]

2. Install git [https://git-scm.com/downloads]

3. Download project from git repository: git clone [https://github.com/elearningforce/lms365.ui-tests.git]

4. Install Java Development Kit (JDK) [http://www.oracle.com/technetwork/java/javase/downloads/index.html]

5. Run Command: →  Go to Project Directory 

   - npm install (Install npm)

   - code . (Run visual studio code)

6. Navigate to /infractructure/constants.ts

   Set:

   - Set Instans Id for App: CourseCatalog: null -> CourseCatalog: 'da3d5de0-b304-4ae4-a624-648529794050'

   - Set Site where App is installed: Site: null -> Site: [https://elearningforce.sharepoint.com/sites/bn]

   - Set Login and Password for Users

   - File -> References -> Keyboard Shortlab:

```
    // Place your key bindings in this file to overwrite the defaults    
    [
      { "key": "ctrl+shift+t", "command": "workbench.action.tasks.test" }      
    ]
```

7. Build project: Shift + Cntl + B

8. Run tests: Shift + Cntl + T


> Article is taken from Natalia's Bogdan guide: [https://wiki.belitsoft.com/display/SPT/How+to+run+Autotests]
