const Collection = (options) => {

  let modifiedEventPublisher = () => { };
  let modifiedEventPayload = {};
  let itemName = "";
  let isComplexObjectArray = false;

  const Add = (item) => {
    me.Items.push(item);
    modifiedEventPayload.Item = item;
    modifiedEventPayload.Change = "added";
    modifiedEventPublisher(modifiedEventPayload);
  };

  const Remove = (test) => {
    const subset = me.Items.map(item => {
      if (test(item)) {
        modifiedEventPayload.Item = item;
        modifiedEventPayload.Change = "removed";
        modifiedEventPublisher(modifiedEventPayload);
      } else {
        return item;
      }
    });
    me.Reset(subset);
  };

  const RemoveAt = (index) => {
    me.Items.splice(index, 1);
  };

  const Reset = function(withItems) {
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
    if (isComplexObjectArray) {
      return me.Items.map(x => x.HydrateOut());
    } else {
      return [...me.Items];
    }
  }

  const RemoveByName = (name) => {
    Remove(item => item.Name === name);
  };

  const FindByName = (name) => {
    return me.Items.find(item => item.Name === name);
  };

  const FindById = (id) => {
    return me.Items.find(item => item.Id.toString() === id.toString());
  };

  const initialize = () => {
    if (options && options.ModifiedEventPublisher) {
      modifiedEventPublisher = options.ModifiedEventPublisher;
    }
    if (options && options.ModifiedEventPayload) {
      modifiedEventPayload = options.ModifiedEventPayload;
    }
    if (options && options.ItemName) {
      itemName = options.itemName;
    }
    if (options && options.IsComplexObjectArray) {
      isComplexObjectArray = true;
    }
  };

  initialize();

  const me = {
    Items: [],
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