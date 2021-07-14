# orientation-extensis-portfolio-server-side-scripting
Separate user initiated ( _On Job_ ) as well as automatic ( _On Cataloged_ ) Extensis Portfolio Server Side scripts that apply an item's orientation value ( _e.g. Landscape , Portrait , or Square_ ) to a desired custom field.

## Script Installation Procedure :

#### 1. PORTFOLIO SERVER VERSION
* Via the Portfolio Administration ( _:8091_ ) Web interface , verify the current version of your Portfolio instance.
Although the provided Server Side Scripts may work on earlier Portfolio versions , Portfolio version 3.6.3 ( _or greater_ ) is recommended.

#### 2. SCRIPTS SUB-FOLDER
* Windows Server : Via the Windows File Explorer , navigate to the **`C:\Program Files(x86)\Extensis\Portfolio Server\data`** folder and create the **`custom-scripts`** sub-folder ( _if not already present_ ).
  * Verify that the `C:\Program Files(x86)\Extensis\Portfolio Server\data\custom-scripts` folder is now visible within the Windows File Explorer.
* Macintosh Server : Via the Macintosh Finder , navigate to the **`/Applications/Extensis/Portfolio Server/data`** folder and create the **`custom-scripts`** sub-folder ( _if not already present_ ).
  * Verify that the `/Applications/Extensis/Portfolio Server/data/custom-scripts` folder is now visible within the Macintosh Finder.

#### 3. SCRIPT INSTALLATION
* Copy the individual scripts ( _.js file extension_ ) to your Portfolio instance's operating system specific `custom-scripts` sub-folder.

#### 4. INSTALLATION VERIFICATION
* Your Portfolio instance's `server.log` will contain individual **`[extensis.portfolio.server.scripting.ScriptManager] custom script '[script_name].js' was added`** entries indicating proper script installation.
  * Verify that the user initiated script entry is now listed as a selection within the Portfolio Web and/or Desktop Client interface's **Run Script** tool.
    * Note that automatic ( _On Cataloged_ ) Server Side Scripts do not appear as selections within the Portfolio Web and/or Desktop Client interface's Run Script tool.

#### 5. SCRIPT MAINTENANCE
* Server Side Scripts should be viewed , edited , and maintained using a standard programmer's text editor :
  * Windows :point_right: Notepad++ ( _https://notepad-plus-plus.org_ ).
  * Macintosh :point_right: Atom ( _https://atom.io/_ ).
