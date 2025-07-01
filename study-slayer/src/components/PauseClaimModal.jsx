// components/PauseClaimModal.js
export default function PauseClaimModal({ onClaim, onDecline, nextPauseMilestone }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm text-center shadow-lg">
        <h2 className="text-xl font-bold mb-4">Pauze beschikbaar!</h2>
        <p className="mb-6">Je hebt {nextPauseMilestone} XP bereikt. Wil je 5 minuten pauze nemen door deze XP in te wisselen?</p>
        <div className="flex justify-around">
          <button
            onClick={onClaim}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Ja, pauze nemen
          </button>
          <button
            onClick={onDecline}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Nee, doorgaan
          </button>
        </div>
      </div>
    </div>
  );
}
