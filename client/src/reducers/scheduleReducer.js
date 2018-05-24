const initialState = {
  member: {
    name: "no-name-set",
    class: "no class set",
    schedule: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    }
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
