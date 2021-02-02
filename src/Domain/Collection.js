const Collection = (options) => {

  //Private Fields
  let hydrateOut;
  let itemName;
  let modifiedEventPayload;
  
  //Public Fields
  let Items;

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
    Items.push(item);
    modifiedEventPayload.Item = item;
    modifiedEventPayload.Change = "added";
    modifiedEventPublisher(modifiedEventPayload);
  };

  Remove = (test) => {
    Items = Items.map(item => {
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
      Items = [...domainItems];
    } else {
      Items = [...initialItems];
    }
  };

  HydrateOut = () => {
    if (hydrateOut) {
      return Items.map(x => x.HydrateOut());
    } else {
      return [...Collection.Items];
    }
  }

  RemoveByName = (name) => {
    Remove(item => item.Name === name);
  };

  FindByName = (name) => {
    return Items.find(item => item.Name === name);
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
    Items = [];
  };

  initialize();

  return {
    Items,
    Add,
    Remove,
    RemoveByName,
    FindByName,
    HydrateIn,
    HydrateOut,
  };

};
export default Collection;