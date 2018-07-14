var onRun = function(context) {
  var doc = context.document
  var pages = doc.pages()
  var currentPageID = doc.currentPage().objectID()

  for (var i = 0; i < pages.length; i++) {
    doc.setCurrentPage(pages[i])
    var currentArtboard = doc.findCurrentArtboardGroup()
    
    context.api().selectedDocument.selectedPage.selectedLayers.clear()

    var action = doc.actionsController().actionForID("MSCollapseAllGroupsAction")

    if(action.validate()) {
      action.doPerformAction(nil)
      if(currentArtboard !== null) {
        currentArtboard.select_byExpandingSelection(true, false)
      }
    } else {
      log("Failed to perform MSCollapseAllGroupsAction: invalid action ID.")
    }
  }
  for (var i = 0; i < pages.length; i++) {
    if (currentPageID == pages[i].objectID()) {
      doc.setCurrentPage(pages[i])
      break
    }
  }
  doc.showMessage('Collapsed All Artboards and Groups on this Document! 🙌')
};
