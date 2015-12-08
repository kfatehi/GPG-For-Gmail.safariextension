module.exports = function($) {
  var api = { dom: {}, tools: {} };

  api.dom.toolbar = function() {
    var tb = $("[gh='mtb']");

    while($(tb).children().length == 1){
      tb = $(tb).children().first();
    }

    return tb;
  }

  api.tools.add_toolbar_button = function(content_html, onClickFunction, styleClass) {
    var container = $(document.createElement('div'));
    container.attr('class','G-Ni J-J5-Ji');

    var button = $(document.createElement('div'));
    var buttonClasses = 'T-I J-J5-Ji lS ';
    if(styleClass != undefined &&
      styleClass != null &&
      styleClass != ''){
      buttonClasses += styleClass;
    }else{
      buttonClasses += 'T-I-ax7 ar7';
    }
    button.attr('class', buttonClasses);

    button.html(content_html);
    button.click(onClickFunction);

    var content = $(document.createElement('div'));
    content.attr('class','asa');

    container.html(button);

    api.dom.toolbar().append(container);

    return container;
  }

  api.dom.email_body = function() {
    return $('.nH.hx');
  }

  api.dom.email_contents = function() {
    var items = $('.ii.gt');
    var ids = [];

    for(var i=0; i<items.length; i++) {
      var mail_id = items[i].getAttribute('class').split(' ')[2];
      var is_editable = items[i].getAttribute('contenteditable');
      if(mail_id != 'undefined' && mail_id != undefined) {
        if(is_editable != 'true') {
          ids.push(items[i]);
        }
      }
    }

    return ids;
  }

  api.tools.add_modal_window = function(title, content_html, onClickOk, onClickCancel, onClickClose) {
    var remove = function() {
      $('#gmailJsModalBackground').remove();
      $('#gmailJsModalWindow').remove();
    };
    
    // By default, clicking on cancel or close should clean up the modal window
    onClickClose = onClickClose || remove;
    onClickCancel = onClickCancel || remove;
    
    var background = $(document.createElement('div'));
    background.attr('id','gmailJsModalBackground');
    background.attr('class','Kj-JD-Jh');
    background.attr('aria-hidden','true');
    background.attr('style','opacity:0.75;width:100%;height:100%;');
    
    // Modal window wrapper
    var container = $(document.createElement('div'));
    container.attr('id','gmailJsModalWindow');
    container.attr('class', 'Kj-JD');
    container.attr('tabindex', '0');
    container.attr('role', 'alertdialog');
    container.attr('aria-labelledby', 'gmailJsModalWindowTitle');
    container.attr('style', 'left:50%;top:50%;opacity:1;');
    
    // Modal window header contents
    var header = $(document.createElement('div'));
    header.attr('class', 'Kj-JD-K7 Kj-JD-K7-GIHV4');
    
    var heading = $(document.createElement('span'));
    heading.attr('id', 'gmailJsModalWindowTitle');
    heading.attr('class', 'Kj-JD-K7-K0');
    heading.attr('role', 'heading');
    heading.html(title);
    
    var closeButton = $(document.createElement('span'));
    closeButton.attr('id', 'gmailJsModalWindowClose');
    closeButton.attr('class', 'Kj-JD-K7-Jq');
    closeButton.attr('role', 'button');
    closeButton.attr('tabindex', '0');
    closeButton.attr('aria-label', 'Close');
    closeButton.click(onClickClose);
    
    header.append(heading);
    header.append(closeButton);
    
    // Modal window contents
    var contents = $(document.createElement('div'));
    contents.attr('id', 'gmailJsModalWindowContent');
    contents.attr('class', 'Kj-JD-Jz');
    contents.html(content_html);
    
    // Modal window controls
    var controls = $(document.createElement('div'));
    controls.attr('class', 'Kj-JD-Jl');
    
    var okButton = $(document.createElement('button'));
    okButton.attr('id', 'gmailJsModalWindowOk');
    okButton.attr('class', 'J-at1-auR J-at1-atl');
    okButton.attr('name', 'ok');
    okButton.text('OK');
    okButton.click(onClickOk);
    
    var cancelButton = $(document.createElement('button'));
    cancelButton.attr('id', 'gmailJsModalWindowCancel');
    cancelButton.attr('name', 'cancel');
    cancelButton.text('Cancel');
    cancelButton.click(onClickCancel);
    
    controls.append(okButton);
    controls.append(cancelButton);
    
    container.append(header);
    container.append(contents);
    container.append(controls);
    
    $(document.body).append(background);
    $(document.body).append(container);
    
    var center = function() {
      container.css({
        top: ($(window).height() - container.outerHeight()) / 2,
        left: ($(window).width() - container.outerWidth()) / 2
      });
    };
    
    center();
    
    $(window).resize(center);
  }
  return api
}
