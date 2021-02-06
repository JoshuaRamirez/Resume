import Profile from "./Profile";
import Data from "../Data";

const ProfileCache = async function() {
  if (me.CachedProfile) {
    return me.CachedProfile;
  } else {
    const json = await Data.ReadProfile(1);
    me.CachedProfile = Profile();
    me.CachedProfile.HydrateIn(json);
  }
  return me.CachedProfile;
}

const me = {
  Profile: ProfileCache,
  CachedProfile: null,
};

export default me;