const PersonalInformation = () => {
  return (
    <div className="p-4 max-w-[720px] rounded-md shadow-sm dark:bg-gray-50">
      {/* First Name, Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        <div>
          <label htmlFor="firstName" className="text-sm">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="firstName"
            className="w-full rounded-md focus:ring focus:ring-opacity-75
                 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="text-sm lg:text-xl md:text-xl">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full rounded-md focus:ring focus:ring-opacity-75
                 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl"
          />
        </div>
      </div>

      {/* Email */}
      <div className="col-span-full sm:col-span-3">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          id="email"
          required
          type="email"
          name="email"
          placeholder="Email"
          className="w-full rounded-md focus:ring focus:ring-opacity-75
                 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl"
        />
      </div>
      {/* Number */}
      <div className="col-span-full sm:col-span-3">
        <label htmlFor="number" className="text-sm">
          Contact Number
        </label>
        <input
          id="number"
          required
          type="number"
          name="number"
          placeholder="Contact Number"
          className="w-full rounded-md focus:ring focus:ring-opacity-75
                 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl resize-none
             appearance-none [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none 
             [&::-moz-number-spin-box]:appearance-none
                 "
        />
      </div>

      {/* Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        <div>
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            id="password"
            required
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-md focus:ring focus:ring-opacity-75
                 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full rounded-md focus:ring focus:ring-opacity-75
                 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl"
          />
        </div>
      </div>

      {/* Address */}

      <div className="grid grid-cols-2 gap-2">
        <div className="">
          <label htmlFor="address" className="text-sm">
            Present Address
          </label>
          <textarea
            id="address"
            placeholder="Address"
            name="presentAddress"
            className="w-full rounded-md focus:ring focus:ring-opacity-75
              dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 p-1 border-amber-300 text-xl resize-none"
            required
          />
        </div>
        <div className="">
          <label htmlFor="address" className="text-sm">
            Permanent Address
          </label>
          <textarea
            required
            id="address"
            name="permanentAddress"
            placeholder="Address"
            className="w-full rounded-md focus:ring focus:ring-opacity-75
              dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl resize-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        <div className="w-full">
          <label htmlFor="city" className="text-sm">
            City
          </label>
          <input
            id="city"
            type="text"
            name="city"
            required
            placeholder="City"
            className="w-full rounded-md focus:ring focus:ring-opacity-75
              dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl resize-none"
          />
        </div>
        <div className="w-full">
          <label htmlFor="country" className="text-sm">
            Country
          </label>
          <input
            id="country"
            type="text"
            name="country"
            required
            placeholder="Country"
            className="w-full rounded-md focus:ring focus:ring-opacity-75
              dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
