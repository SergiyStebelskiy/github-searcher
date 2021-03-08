import { useEffect, useState, Fragment, ChangeEvent } from "react";
import s from "./styles.module.scss";
import {
  Typography,
  Avatar,
  TextField,
  List,
  CircularProgress,
} from "@material-ui/core";
import { getUser, getUserRepos, searchUserRepo } from "services";
import { useParams } from "react-router-dom";
import UserDetails from "components/UserDetails";
import RepoItem from "components/RepoItem";
import MessageBox from "components/MessageBox";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "actions/user";
import { IRouteParams, IMessage } from "interfaces";

const UserPage = () => {
  const [data, setData] = useState({
    id: null,
    avatar_url: "",
    name: "",
    login: "",
    email: "",
    location: "",
    created_at: "",
    followers: 0,
    following: 0,
    bio: "",
  });
  const [repoVal, setRepoVal] = useState<string>("");
  const [repos, setRepos] = useState([]);
  const [searchedRepo, setSearchedRepo] = useState<object>({});
  const [repoLoading, setRepoLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [repoMessage, setRepoMessage] = useState<IMessage>({
    text: "",
    icon: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<IRouteParams>();
  const users: any = useSelector((state) => state);
  const user = users[params.id];
  useEffect(() => {
    if (user) {
      const { repos, ...spread } = user;
      setRepos(repos);
      setData({ ...spread });
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    if (repos.length && !user) {
      dispatch(setUser({ ...data, repos }));
    }
  }, [repos, data, dispatch, user]);
  useEffect(() => {
    if (params.id) {
      if (!user) {
        getUser(params.id)
          .then((res) => {
            setData(res.data);
            setLoading(false);
          })
          .catch((err) => {
            const status = err.response.status;
            if (status === 404) {
              history.push("/");
            }
          });
        getUserRepos(params.id).then((res) => {
          setRepos(res.data);
        });
      }
    }
  }, [params.id, history, dispatch, user]);
  const handleSearchRepos = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setRepoVal(val);
    setRepoLoading(true);
    setRepoMessage({
      text: "",
      icon: "",
    });
    if (val.length) {
      searchUserRepo(data.login, val)
        .then((res) => {
          setSearchedRepo(res.data);
          setRepoLoading(false);
        })
        .catch((err) => {
          const status = err.response.status;
          setRepoLoading(false);
          if (status === 404) {
            setRepoMessage({
              icon: "🙈",
              text: `Oooppsss...We couldn't find a repo with a name "${val}"`,
            });
          } else {
            setRepoMessage({
              icon: "😿",
              text:
                "Sorry, we have technical problems. Please try again later ...",
            });
          }
        });
    } else {
      setSearchedRepo({});
      setRepoLoading(false);
    }
  };
  const getRepos = (): any[] =>
    Object.keys(searchedRepo).length ? [searchedRepo] : repos;

  return (
    <div className="main-wrap">
      {loading && (
        <CircularProgress style={{ margin: "0 auto", display: "block" }} />
      )}
      {!loading && (
        <Fragment>
          <Link to="/">
            <Typography className="title" variant="h2" component="h1">
              Github searcher
            </Typography>
          </Link>
          <div className={s.userDetails}>
            <Avatar
              variant="rounded"
              className={s.avatar}
              src={data.avatar_url}
            ></Avatar>
            <UserDetails
              data={{
                name: data.name,
                login: data.login,
                email: data.email,
                location: data.location,
                created_at: data.created_at,
                followers: data.followers,
                following: data.following,
              }}
            />
          </div>
          <p className={s.bio}>{data.bio || "no user biography"}</p>
          <div className="search-field">
            <TextField
              value={repoVal}
              onChange={handleSearchRepos}
              className="field"
              label="Search for User's Repositories"
              variant="outlined"
            />
          </div>
          {!repoLoading && getRepos().length && !repoMessage.text && (
            <List className="list">
              {getRepos().map(
                ({ name, forks_count, stargazers_count }, index) => (
                  <RepoItem
                    data={{ name, forks_count, stargazers_count }}
                    key={index}
                  />
                )
              )}
            </List>
          )}
          {repoLoading && (
            <CircularProgress style={{ margin: "0 auto", display: "block" }} />
          )}
          {repoMessage.text && !repoLoading && <MessageBox {...repoMessage} />}
        </Fragment>
      )}
    </div>
  );
};
export default UserPage;
