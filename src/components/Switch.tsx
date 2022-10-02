import { HTMLAttributes } from 'react';

export const Switch = ({ children, ...rest }: HTMLAttributes<HTMLInputElement>) => {
  return (
    <label htmlFor="checked-toggle" className="inline-flex relative items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" {...rest} />
      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-black  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-100 peer-checked:bg-purple-700"></div>
      <span className="ml-2 text-gray-900">{children}</span>
    </label>
  );
};
