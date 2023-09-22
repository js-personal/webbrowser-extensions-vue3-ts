const HANDLED_PLATFORMS = [
		'youtube',
]

let intervalChecker = null;
let intervalCount = 0;
const isHandledPlatform = (url) => {
		return HANDLED_PLATFORMS.some(function (botName) {
				return url.indexOf(botName) !== -1;
		});
}

const stopIntervalChecker = () => {
		clearInterval(intervalChecker);
		intervalChecker = null;
		intervalCount = 0;
}

const getTabs = async () => {
		return await chrome.tabs.query({active: true})

}

const getTabById = async (id) => {
		const tabs = await getTabs();
		return tabs.find(tab => tab.id === id) || null;
}

const createIntervalChecker = (tabId) => {
		intervalChecker = setInterval(() => {
				console.log('Interval pub checker...');
				const exec = chrome.scripting.executeScript({
						target: {tabId: tabId || 0},
						func: () => {
								let x = document.getElementsByClassName("ytd-popup-container");
								for(let i = x.length - 1; i >= 0; i--) {
										x[i].parentNode.removeChild(x[i]);
										stopIntervalChecker();
								}
						}
				});
				if (intervalCount > 50) stopIntervalChecker();
				intervalCount++;
    }, 650);
}


const checkPlatformsAds = async (activeInfo) => {
		stopIntervalChecker();
		const tab = await getTabById(activeInfo.tabId);
		if (tab.url) {
				let url = tab.url;
				if (isHandledPlatform(url)) {
						createIntervalChecker(activeInfo.tabId);
				}
		}
}

chrome.tabs.onActivated.addListener(checkPlatformsAds);
chrome.tabs.onCreated.addListener(checkPlatformsAds);