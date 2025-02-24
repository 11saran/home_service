import CategorySideBar from "./_components/CategorySideBar";
import React from 'react'

function layout({children}) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-8">
        <div className="hidden md:block">
            <CategorySideBar/>
        </div>
        <div className="col-span-3">{children}</div>
      </div>
    </div>
  );
}

export default layout