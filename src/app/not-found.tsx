export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-8xl font-bold text-black mb-4">404</div>
        <h1 className="text-2xl font-bold text-black mb-4">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-gray-600 mb-6">
          요청하신 페이지가 존재하지 않거나
          <br />
          이동되었을 수 있습니다.
        </p>
      </div>
    </div>
  );
}
