// Web3Forms access keys are designed to be public (used from the browser).
export const WEB3FORMS_ACCESS_KEY = "40db31af-24d3-4b00-a4be-b4912e431cde";

export async function sendToWeb3Forms(fields) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...fields }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Unable to send your message.");
  }

  return data;
}

// The auto popup shows once per tab session. sessionStorage survives page
// navigation and reloads, and is cleared when the tab is closed.
const POPUP_SESSION_KEY = "enquiryPopupShown";

export function hasPopupShownThisSession() {
  try {
    return sessionStorage.getItem(POPUP_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

export function markPopupShown() {
  try {
    sessionStorage.setItem(POPUP_SESSION_KEY, "true");
  } catch {
    // Storage can be blocked (private mode); the popup then just won't persist.
  }
}

// An enquiry sent from the contact page also stops the popup for this session.
export function markEnquirySubmitted() {
  markPopupShown();
}
