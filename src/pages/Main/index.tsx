import { useState, ChangeEvent } from "react";
import {
  Typography,
  TextField,
  List,
  CircularProgress,
} from "@material-ui/core";
import { searchUser } from "services";
import UserItem from "components/UserItem";
import MessageBox from "components/MessageBox";
import { IMessage } from "interfaces";

const emptyUser = {
  id: null,
  avatar_url: "",
  name: "",
  public_repos: 0,
  login: "",
};

const defaultMessage = {
  icon: "😏",
  text: "Search for users and see their data.",
};

const MainPage = () => {
  const [nameVal, setNameVal] = useState<string>("");
  const [user, setUser] = useState(emptyUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<IMessage>(defaultMessage);

  const handleSearchUser = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setNameVal(val);
    if (!val.length) {
      setUser(emptyUser);
      setMessage(defaultMessage);
    } else {
      setLoading(true);
      searchUser(val)
        .then((res) => {
          setMessage({ icon: "", text: "" });
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          const status = err.response.status;
          setLoading(false);
          if (status === 404) {
            setMessage({
              icon: "😬",
              text: `Oooppsss...We couldn't find a user with a name "${val}"`,
            });
          } else {
            setMessage({
              icon: "😢",
              text:
                "Sorry, we have technical problems. Please try again later ...",
            });
          }
        });
    }
  };
  return (
    <div className="main-wrap">
      <Typography className="title" variant="h2" component="h1">
        Github searcher
      </Typography>
      <div className="search-field">
        <TextField
          value={nameVal}
          onChange={handleSearchUser}
          className="field"
          label="Search for Users"
          variant="outlined"
        />
      </div>
      {Boolean(user.id) && !loading && !message.text.length && (
        <List className="list">
          <UserItem data={user} />
        </List>
      )}
      {loading && (
        <CircularProgress style={{ margin: "0 auto", display: "block" }} />
      )}
      {message.text && !loading && <MessageBox {...message} />}
    </div>
  );
};
export default MainPage;
