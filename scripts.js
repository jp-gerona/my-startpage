/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input");
const searchButton = document.querySelector("#searchbar > button");

const lookup = {
  "/": "/",
  reddit: "https://reddit.com/",
  maps: "https://maps.google.com/",
  chatgpt: "https://chatgpt.com/",
  gemini: "https://gemini.google.com/app",
  facebook: "https://www.facebook.com",
  messenger: "https://messenger.com/",
  instagram: "https://instagram.com",
  bbl: "https://mcl.blackboard.com/ultra/stream/",
  teams: "https://teams.microsoft.com/v2/",
  github: "https://github.com/",
  figma: "https://www.figma.com/",
  postman: "https://www.postman.com/",
  youtube: "https://youtube.com",
  twitch: "https://twitch.com",
};
const engine = "google";
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
};

const isWebUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getTargetUrl = (value) => {
  if (isWebUrl(value)) return value;
  if (lookup[value]) return lookup[value];
  const url = engineUrls[engine] ?? engine;
  return url.replace("{query}", value);
};

const search = () => {
  const value = searchInput.value;
  const targetUrl = getTargetUrl(value);
  window.open(targetUrl, "_self");
};

searchInput.onkeyup = (event) => event.key === "Enter" && search();
searchButton.onclick = search;

/**
 * inject bookmarks into html
 */

const bookmarks = [
  {
    id: "7aK6JDt5AAWZ5GKJ",
    label: "school",
    bookmarks: [
      {
        id: "0jrFbzs2RPspvzIR",
        label: "blackboard",
        url: "https://mcl.blackboard.com/ultra/stream/",
      },
      {
        id: "cIM8uKNViS2FaLEL",
        label: "teams",
        url: "https://teams.microsoft.com/v2/",
      },
      {
        id: "tgonLboZDrjJKT5b",
        label: "coursera",
        url: "https://www.coursera.org/programs/mapua-university-batch-2016-xbv1a?authProvider=mapua",
      },
    ],
  },
  {
    id: "7minpSzW6v6N67Ty",
    label: "code",
    bookmarks: [
      { id: "2xXPDNhMkNLjHzqR", label: "github", url: "https://github.com/" },
      { id: "6fupJOo5XyxbSiwa", label: "figma", url: "https://www.figma.com/" },
      {
        id: "sz5DLqHE4JhYTCX6",
        label: "postman",
        url: "https://www.postman.com/",
      },
    ],
  },
  {
    id: "wojjqj9xsp0fmsMp",
    label: "media",
    bookmarks: [
      { id: "Ysu3mLnX21KMUx3Z", label: "youtube", url: "https://youtube.com" },
      { id: "jaSyAdIZ67XOJn2G", label: "twitch", url: "https://twitch.com" },
    ],
  },
  {
    id: "2JltTeXiIDlyrPMH",
    label: "misc",
    bookmarks: [
      {
        id: "kE7nnIcEVXlKiMP3",
        label: "awwwards",
        url: "https://awwwards.com",
      },
    ],
  },
];

const createGroupContainer = () => {
  const container = document.createElement("div");
  container.className = "bookmark-group";
  return container;
};

const createGroupTitle = (title) => {
  const h2 = document.createElement("h2");
  h2.innerHTML = title;
  return h2;
};

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = url;
  a.innerHTML = label;
  li.append(a);
  return li;
};

const createBookmarkList = (bookmarks) => {
  const ul = document.createElement("ul");
  bookmarks.map(createBookmark).forEach((li) => ul.append(li));
  return ul;
};

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer();
  const title = createGroupTitle(label);
  const bookmarkList = createBookmarkList(bookmarks);
  container.append(title);
  container.append(bookmarkList);
  return container;
};

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks");
  bookmarksContainer.append();
  bookmarks
    .map(createGroup)
    .forEach((group) => bookmarksContainer.append(group));
};

injectBookmarks();
