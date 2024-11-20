function ProtectedRoute({ user, children }) {
  if (!user) {
    return (
      <div className="grid place-items-center h-screen">
        <h1 className="text-4xl">You are not logged in</h1>
        <a href="/login" className="text-2xl">Login</a>
      </div>
    )
  }

  return children
}

export default ProtectedRoute;