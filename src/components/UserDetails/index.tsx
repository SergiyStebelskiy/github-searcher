import { FC } from "react";
import s from "./styles.module.scss";

interface Props {
  data: {
    name?: string;
    login?: string;
    email?: string;
    location?: string;
    created_at: string;
    followers: number;
    following: number;
  };
}

const UserDetails: FC<Props> = ({ data }) => {
  const {
    name,
    login,
    email,
    location,
    created_at,
    followers,
    following,
  } = data;
  return (
    <ul className={s.details}>
      <li>Name: {name || login}</li>
      <li>Email: {email || "no data"}</li>
      <li>Location: {location || "no data"}</li>
      <li>Created at: {new Date(created_at).toLocaleDateString()}</li>
      <li>Followers: {followers}</li>
      <li>Following: {following}</li>
    </ul>
  );
};

export default UserDetails;
