const Collection = () => {

  const Add = (item) => {
    me.Items.push(item);
  };

  const Remove = (test) => {
    const indexToRemove = me.Items.findIndex(test);
    RemoveAt(indexToRemove);
  };

  const RemoveAt = (index) => {
    me.Items.splice(index, 1);
  };

  const RemoveByName = (name) => {
    Remove(item => item.Name === name);
  };

  const Reset = function (withItems) {
    me.Items.splice(0, me.Items.length);
    me.Items.push(...withItems);
  };

  const HydrateIn = (initialItems, domainClass) => {
    if (!initialItems) return;
    let domainObjects;
    if (domainClass) {
      domainObjects = initialItems.map(item => {
        const domainObject = domainClass();
        domainObject.HydrateIn(item);
        return domainObject;
      });
      me.Reset(domainObjects);
    } else {
      me.Reset(initialItems);
    }
  };

  const HydrateOut = () => {
    return me.Items.map((item) => {
      if (item.HydrateOut) {
        return item.HydrateOut();
      } else {
        return item;
      }
    });
  }

  const FindByName = (name) => {
    return me.Items.find(item => item.Name === name);
  };

  const FindById = (id) => {
    return me.Items.find(item => item.Id.toString() === id.toString());
  };

  const me = {
    Items: [],
    PauseEvents: false,
    Add,
    Remove,
    RemoveAt,
    RemoveByName,
    FindByName,
    FindById,
    Reset,
    HydrateIn,
    HydrateOut,
  };

  return me;

};
export default Collection;