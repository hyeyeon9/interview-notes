"use client";

export default function Error() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold text-black mb-4">
          오류가 발생했습니다
        </h1>
        <p className="text-gray-600 mb-6">
          일시적인 문제가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          새로고침
        </button>
      </div>
    </div>
  );
}
