import * as React from 'react';
import { CommandBar, Toggle, assign,
    itemsNonFocusable, farItemsNonFocusable
} from 'office-ui-fabric-react';

export default class CommandBarBasicExample extends React.Component {
  render() {
    console.log('thing', itemsNonFocusable)
    return (
      <div>
          <CommandBar
            isSearchBoxVisible={ false }
            items={ itemsNonFocusable }
            farItems={ farItemsNonFocusable }
          />
      </div>
    );
  }
}