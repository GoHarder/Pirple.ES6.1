// Container for the application
var lib = {};

lib.html = `
<div id="modal">
<div class="modal">
   <div id="modalMenu">
      <div>
         <h1>To-do lists</h1>
         <h2>A place to store your lists</h2>
      </div>

      <div class="inputWrapper">
         <button data-app="signUp">Sign Up</button>
         <button data-app="logIn">Log In</button>
      </div>
   </div>

   <div id="modalForm">
      <div id="userInfoError" class="inputWrapper"></div>

      <form id="signUp">
         <div class="inputWrapper">
            <label for="firstName">First Name</label>
            <input type="text" name="firstName"  />
         </div>

         <div class="inputWrapper">
            <label for="lastName">Last Name</label>
            <input type="text" name="lastName"  />
         </div>

         <div class="inputWrapper">
            <label for="email">Email</label>
            <input type="email" name="email"  />
         </div>

         <div class="inputWrapper">
            <label for="password">Password</label>
            <input type="password" name="password"  />
         </div>

         <div class="inputWrapper">
            <input type="checkbox" name="tos"  />
            <label for="tos">I agree to the Terms of Use</label>
         </div>

         <div class="inputWrapper">
            <button data-app="signUp/ok">Ok</button>
            <button data-app="signUp/cancel">Cancel</button>
         </div>
      </form>

      <form id="logIn">
         <div class="inputWrapper">
            <label for="email">Email</label>
            <input type="email" name="email"  />
         </div>

         <div class="inputWrapper">
            <label for="password">Password</label>
            <input type="password" name="password"  />
         </div>

         <div class="inputWrapper">
            <button data-app="logIn/ok">Ok</button>
            <button data-app="logIn/cancel">Cancel</button>
         </div>
      </form>
   </div>
</div>
</div>

<div id="spa">
<header>
   <h1>To-do lists</h1>
   <button data-app="settings">Account Settings</button>
   <button data-app="logOut">Log Out</button>
</header>

<main>
   <div id="main">
      <div id="dashboard">
         <h2>Dashboard</h2>
         <ul id="dashboardList">
            <li>
               <div id="addListError" class="inputWrapper"></div>
               <form id="addList">
                  <input type="text" name="title" />
                  <button data-app="dashboard/add">Add List</button>
               </form>
            </li>
         </ul>
      </div>

      <div id="list">
         <form id="listEdit">
            <div class="inputWrapper">
               <form>
                  <label for="title">Title</label>
                  <input id="listTitle" type="text" name="title" />
                  <button data-app="list/save">Save</button>
               </form>
            </div>

            <ul id="itemList">
               <li>
                  <div id="listItemError" class="inputWrapper"></div>
                  <form id="addItem">
                     <input type="text" name="text" />
                     <button data-app="list/add">Add Item</button>
                  </form>
               </li>
            </ul>
         </form>
      </div>
   </div>

   <div id="settings">
      <div id="settingsForm">
         <div id="settingsError" class="inputWrapper"></div>

         <form id="editUser">
            <div class="inputWrapper">
               <label for="firstName">First Name</label>
               <input type="text" name="firstName" />
            </div>

            <div class="inputWrapper">
               <label for="lastName">Last Name</label>
               <input type="text" name="lastName" />
            </div>

            <div class="inputWrapper">
               <label for="email">Email</label>
               <input type="email" name="email" />
            </div>

            <div class="inputWrapper">
               <label for="password">Password</label>
               <input type="password" name="password" />
            </div>

            <div class="inputWrapper">
               <button data-app="settings/ok">Ok</button>
               <button data-app="settings/cancel">Cancel</button>
            </div>
         </form>
      </div>
   </div>
</main>
</div>
`;

lib.init = () => {
   document.body.innerHTML = lib.html;
};

// Export module
export default lib;
