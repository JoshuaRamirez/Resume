const Collection = (options) => {

  //Private Fields
  let hydrateOut;
  let itemName;
  let items;
  let modifiedEventPayload;

  //Private Functions
  let initialize;
  let modifiedEventPublisher;

  //Public Functions
  let Add;
  let Remove;
  let FindByName;
  let HydrateIn;
  let HydrateOut;
  let RemoveByName;



  Add = (item) => {
    item.push(item);
    modifiedEventPayload.Item = item;
    modifiedEventPayload.Change = "added";
    modifiedEventPublisher(modifiedEventPayload);
  };

  Remove = (test) => {
    items = items.map(item => {
      if (test(item)) {
        modifiedEventPayload.Item = item;
        modifiedEventPayload.Change = "removed";
        modifiedEventPublisher(modifiedEventPayload);
      } else {
        return item;
      }
    });
  };

  HydrateIn = (initialItems, domainObject) => {
    let domainItems;
    if (domainObject) {
      domainItems = initialItems.map(item => domainObject().HydrateIn(item));
      items = [...domainItems];
    } else {
      items = [...initialItems];
    }
  };

  HydrateOut = () => {
    if (hydrateOut) {
      return items.map(x => x.HydrateOut());
    } else {
      return [...Collection.Items];
    }
  }

  RemoveByName = (name) => {
    Remove(item => item.Name === name);
  };

  FindByName = (name) => {
    return items.find(item => item.Name === name);
  };


  initialize = () => {
    modifiedEventPublisher = () => { };
    modifiedEventPayload = {};
    itemName = "";
    hydrateOut = false;
    if (options && options.ModifiedEventPublisher) {
      modifiedEventPublisher = options.ModifiedEventPublisher;
    }
    if (options && options.ModifiedEventPayload) {
      modifiedEventPayload = options.ModifiedEventPayload;
    }
    if (options && options.ItemName) {
      itemName = options.itemName;
    }
    if (options && options.HydrationOutEnabled) {
      hydrateOut = true;
    }
    items = [];
    console.log("Collection Initialized");
  };

  initialize();

  return {
    Add,
    Remove,
    RemoveByName,
    FindByName,
    HydrateIn,
    HydrateOut,
    get Items() {
      return [...items];
    }
  };

};
console.log("Collection");
export default Collection;