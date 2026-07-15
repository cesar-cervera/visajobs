// Stateless child form component shared by login and register
const AuthForm = ({ user, onChange, onSubmit, isLogin }) => {
  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {/* Only show first and last name on register */}
        {!isLogin && (
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={user.firstName}
                onChange={onChange}
                name="firstName"
                placeholder="First name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={user.lastName}
                onChange={onChange}
                name="lastName"
                placeholder="Last name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
              />
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={onChange}
            name="email"
            placeholder="you@email.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={user.password}
            onChange={onChange}
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 mt-2"
        >
          {isLogin ? 'Log In' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;