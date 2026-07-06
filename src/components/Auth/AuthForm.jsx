// Stateless child form component shared by login and register
const AuthForm = ({ user, onChange, onSubmit, isLogin }) => {
    return (
      <div>
        <form onSubmit={onSubmit}>
          {/* Only show first and last name on register */}
          {!isLogin && (
            <div>
              <div>
                <label>First Name</label>
                <br />
                <input
                  type="text"
                  value={user.firstName}
                  onChange={onChange}
                  name="firstName"
                  placeholder="first name"
                  required
                />
              </div>
              <div>
                <label>Last Name</label>
                <br />
                <input
                  type="text"
                  value={user.lastName}
                  onChange={onChange}
                  name="lastName"
                  placeholder="last name"
                  required
                />
              </div>
            </div>
          )}
          <div>
            <label>Email</label>
            <br />
            <input
              type="email"
              value={user.email}
              onChange={onChange}
              name="email"
              placeholder="email"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              value={user.password}
              onChange={onChange}
              name="password"
              placeholder="password"
              required
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  };
  
  export default AuthForm;