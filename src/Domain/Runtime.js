import Profile from "./Profile";
import Data from "../Data";

let loaded = false;

async function LoadProfile() {
  if (loaded) {
    return me.Profile;
  } else {
    const json = await Data.ReadProfile(1);
    me.Profile.HydrateIn(json);
    loaded = true;
    return me.Profile;
  }
}

const me = {
  LoadProfile,
  Profile: Profile(),
};

export default me;