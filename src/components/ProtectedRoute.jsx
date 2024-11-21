function ProtectedRoute({ user, children }) {
  if (!user) {
    return (
      <div className="grid place-items-center h-screen">
        <h1 className="text-4xl">You are not logged in</h1>
        <div className="flex flex-col gap-2">
          <a href="/login" className="text-2xl">Login</a>
          <a href="/register" className="text-2xl">Register</a>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute;