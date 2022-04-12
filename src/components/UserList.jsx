import React from "react";

export default function UserList({ userList, isScore }) {
  return (
    <div>
      {userList.map((user, index) => {
        return (
          <div key={index}>
            {user.name}: {isScore && user.score}
          </div>
        );
      })}
    </div>
  );
}
