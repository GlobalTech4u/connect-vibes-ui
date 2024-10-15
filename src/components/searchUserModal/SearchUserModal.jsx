import { ClickAwayListener, Modal } from "@mui/material";

import UserCard from "components/userCard/UserCard";

const SearchUserModal = (props) => {
  const { users, showSearchResults, onHideSearchResults } = props;

  return (
    <ClickAwayListener onClickAway={onHideSearchResults}>
      <Modal
        className="search-results-container"
        open={showSearchResults && users?.length > 0}
        onClose={onHideSearchResults}
      >
        <>
          {users.map((user) => (
            <UserCard
              user={user}
              key={`search-card-${user?._id}`}
              onHideSearchResults={onHideSearchResults}
            />
          ))}
        </>
      </Modal>
    </ClickAwayListener>
  );
};

export default SearchUserModal;
