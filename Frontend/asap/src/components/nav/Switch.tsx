import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Chip } from '@material-tailwind/react';
import useDetailStore from 'store/chart/useDetailStore';
import useCategoryStore from 'store/chart/useCategoryStore';
import useNewUserStore from 'store/chart/useNewUserStore';
import useIndustryRateStore from 'store/chart/useIndustryRateStore';

function Switch() {
  const { isLoggedIn, loginType, setLoginType } = useAuthStore(
    (state) => state,
  );
  const { resetApiDetails } = useDetailStore();
  const { resetApiCategory } = useCategoryStore();
  const { resetNewUser } = useNewUserStore();
  const { resetIndustryRate } = useIndustryRateStore();

  const supplierHandler = () => {
    setLoginType('supplier');
    resetApiDetails();
    resetApiCategory();
    resetNewUser();
    resetIndustryRate();
  };
  // useEffect(() => {
  //   return () => {
  //     resetApiDetails();
  //     resetApiCategory();
  //     resetNewUser();
  //     resetIndustryRate();
  //   };
  // }, [resetApiDetails, resetApiCategory, resetNewUser, resetIndustryRate]);

  if (isLoggedIn) {
    return (
      <div className="flex flex-col">
        <div className="w-40 bg-gray-200 flex p-1 rounded-lg">
          <button type="button" onClick={() => setLoginType('user')}>
            <Chip
              size="lg"
              value="사용자"
              className={`text-base px-3 font-bold ${
                loginType === 'user'
                  ? 'bg-blue text-white'
                  : 'bg-gray-200 text-black'
              }`}
            />
          </button>
          <button type="button" onClick={supplierHandler}>
            <Chip
              size="lg"
              value="제공자"
              className={`text-base text-black font-bold ${
                loginType === 'supplier'
                  ? 'bg-blue text-white'
                  : 'bg-gray-200 text-black'
              }`}
            />
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default Switch;
