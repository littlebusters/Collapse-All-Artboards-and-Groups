import DOM from 'sketch/dom';
import UI from 'sketch/ui';

export default function(context) {
  const doc = DOM.Document.getSelectedDocument();
  const pages = doc.pages;
  const selectedPageIndex = pages.findIndex((page) => doc.selectedPage.id === page.id);

  // Native Sketch Function
  const nativeDoc = context.document;
  const action = nativeDoc.actionsController().actionForID("MSCollapseAllGroupsAction")


  pages.forEach ((page) => {
    page.selected = true;
    page.selectedLayers.clear();
    if(action.validate()) {
      action.doPerformAction(nil);
    } else {
      console.log("Failed to perform MSCollapseAllGroupsAction: invalid action ID.")
    }
  });

  // Return to the selected page
  pages[selectedPageIndex].selected = true;
  UI.message('Collapsed All Artboards and Groups in this Document! 🙌');
}
