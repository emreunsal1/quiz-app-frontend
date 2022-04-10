import React from "react";

export default function UserList({ userList, isScore }) {
  return (
    <div>
      {userList.map((user) => {
        return (
          <div>
            {user.name}: {isScore && user.score}
          </div>
        );
      })}
    </div>
  );
}
