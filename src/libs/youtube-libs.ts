/// <reference types="chrome"/>
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

export default class Youtube {


    static async removeAd() {
        const currentTab = await getCurrentTab()

        if (currentTab === undefined) return;

        await chrome.scripting.executeScript({
            target: {tabId: currentTab.id || 0},
            func: () => {
                let x = document.getElementsByClassName("ytd-popup-container");
                for(let i = x.length - 1; i >= 0; i--) {
                    //@ts-ignore
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        });
    }
}