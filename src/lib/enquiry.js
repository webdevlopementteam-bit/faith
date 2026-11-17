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

// Popup visibility is remembered per browser: shown after 8s, again 15s after
// the first close, and never after the second close or any submitted enquiry.
const POPUP_STORAGE_KEY = "enquiryPopup";

export function readPopupState() {
  try {
    const saved = JSON.parse(localStorage.getItem(POPUP_STORAGE_KEY) || "{}");
    return {
      closeCount: Number(saved.closeCount) || 0,
      submitted: saved.submitted === true,
    };
  } catch {
    return { closeCount: 0, submitted: false };
  }
}

function writePopupState(state) {
  try {
    localStorage.setItem(POPUP_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage can be blocked (private mode); the popup then just won't persist.
  }
}

export function recordPopupClose() {
  const state = readPopupState();
  const next = { ...state, closeCount: state.closeCount + 1 };
  writePopupState(next);
  return next;
}

export function markEnquirySubmitted() {
  writePopupState({ ...readPopupState(), submitted: true });
}
