export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-black text-lg font-medium">로딩중...</p>
        <p className="text-gray-500 text-sm mt-2">잠시만 기다려주세요</p>
      </div>
    </div>
  )
}
