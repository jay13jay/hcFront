export const Config = {
    apiURL: "http://jhaxdev.com:3000/api",
    endpoints: {
      auth: "/auth/",
      login: "/users/login/",
      chats: {
        get: "/chats/",
        new: "/chats/new/",
      },
      messages: {
        get: '/messages/',
        new: '/messages/new'
      }
    }
};