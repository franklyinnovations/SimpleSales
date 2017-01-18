/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'SalseClient',

    //-------------------------------------------------------------------------
    // Most customizations should be made to Desktop.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------

    requires: [
        'SC.App',
        'SC.component.AppEventHandler'
        //'SC.component.MainProcessMessageHandler'
    ],
    init: function() {
      SC.component.AppEventHandler.init();
      var app = new SC.App();
      //  app.mainProcessMessageHandler = new SC.component.MainProcessMessageHandler({app:app});
    }
});
