import { runtime, storage } from "webextension-polyfill";

const tailorMeClickedEvent = (
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab | undefined
) => {
  if (info.menuItemId === "ResumeTailor.AI") {
    if (info.selectionText != "") {
      storage.local.set({ selectionText: info.selectionText });

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: "tailorResumeSuccess",
            url: chrome.runtime.getURL("index.html#/dialog"),
          });
        }
      });
    }
  }
};

export function init() {
  chrome.contextMenus.create({
    title: "Tailor Resume for this Job Description",
    id: "ResumeTailor.AI",
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener(tailorMeClickedEvent);
}

runtime.onInstalled.addListener(() => {
  init();
});
