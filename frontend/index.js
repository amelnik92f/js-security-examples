const url = 'http://localhost:3003/api';

const USER_KEY = "user";

const makeBody = (data) => JSON.stringify(data);

const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user)
    }
  } catch (e) {
    console.log("Can't get user from local storage:", e)
  }
}

const renderComment = (commentData, isAdmin) => {
  const commentWrapper = document.createElement('div');
  commentWrapper.className = "comment-item";
  commentWrapper.dataset.commentId = commentData.id;
  const comment = `
    <span class="comment-text">${commentData.text}</span>
    ${isAdmin ? `<span class="comment-delete" role="button" tabindex="0" data-comment-id=${commentData.id}></span>` : '' }
    <span class="comment-author">${commentData.user}</span>
  `;

  commentWrapper.innerHTML = comment;

  if (isAdmin) {
    const deleteButton = commentWrapper.querySelector('.comment-delete');
    deleteButton.addEventListener('click', async ()=>{
      onCommentDelete(commentData.id);
    })
  }

  return commentWrapper;
}

const insertComment = (commentData, isAdmin) => {
  const wrapper = document.querySelector('.comments-list');
  const comment = renderComment(commentData, isAdmin);

  wrapper.appendChild(comment);
}

const getComments = async (params = '') => {
  const rawResponse = await fetch(`${url}/comments${params}`);
  const comments = await rawResponse.json();
  const { role } = getUserFromLocalStorage();
  const isAdmin = role === "admin";
  const wrapper = document.querySelector('.comments-list');
  wrapper.innerHTML = '';

  comments.forEach((comment) => insertComment(comment, isAdmin));
}


const onCommentSearch = async () => {
  const { value } = document.querySelector("#search");

  getComments(`?text=${value}`);
}

const onCommentSend = async () => {
  const { value } = document.querySelector("#send");
  const { role, id } = getUserFromLocalStorage();
  const isAdmin = role === "admin";
  const rawResponse = await fetch(`${url}/comments`, {method: 'POST', body: makeBody({ text: value, user_id: id })} );
  const commentData = await rawResponse.json();
  insertComment(commentData, isAdmin)
}

const onCommentDelete = async (commentId) => {
  try {
    const { id } = getUserFromLocalStorage();

    await fetch(`${url}/admin/comments`, {method: 'DELETE', body: makeBody({user_id: id, id: commentId})});
    await getComments();
  } catch(error) {
    console.error(`Can't delete the comment: ${error}`);
  }
}

const checkLogin = () => {
  const user = getUserFromLocalStorage();
  const login = document.querySelector(".login");
  const main = document.querySelector(".main-page");
  if (!user) {
    login.style.display = 'flex';
    main.style.display = 'none';
  } else {
    login.style.display = 'none';
    main.style.display = 'grid';
    fillUserData();
    getComments();
  }
}

const fillUserData = () => {
  const userName = document.getElementById("username");
  const userAge = document.getElementById("age");
  const { name, age } = getUserFromLocalStorage();
  userName.value = name;
  userAge.value = age;
}


const onLogin = async () => {
  const { value } = document.getElementById('name');
  
  try {
    const rawResponse = await fetch(`${url}/users`, { method: 'POST', body: makeBody({ name: value })} );
    const user = await rawResponse.json();
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    checkLogin();
  } catch (error) {
    console.error(`Error during login: ${error}`)
  }
}

const onLogout = () => {
  localStorage.clear();
  checkLogin();
}

const onProfileUpdate = async () => {
  const name = document.getElementById("username").value;
  const age = Number(document.getElementById("age").value);
  const { id } = getUserFromLocalStorage();
  const rawData = await fetch(`${url}/users`, { method: 'PUT', body: makeBody({ name, age, id })})

  const user = await rawData.json();
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

const init = () => {
  const loginButton = document.getElementById('login-button');
  const searchButton = document.getElementById('search-button');
  const sendButton = document.getElementById('send-button');
  const updateProfileButton = document.getElementById('update-user');
  const logoutButton = document.getElementById('logout-user');

  loginButton.addEventListener('click', onLogin);
  searchButton.addEventListener('click', onCommentSearch);
  sendButton.addEventListener('click', onCommentSend);
  updateProfileButton.addEventListener('click', onProfileUpdate);
  logoutButton.addEventListener('click', onLogout);
  checkLogin();
}


(async () => {
  document.addEventListener('DOMContentLoaded',init);
})()
