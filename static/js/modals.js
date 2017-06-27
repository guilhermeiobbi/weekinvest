$("div[id^='modalQuest']").each(function(){
  
  var currentModal = $(this);
  
  //click next
  currentModal.find('.btn-next').click(function(){
    currentModal.modal('hide');
    currentModal.closest("div[id^='modalQuest']").nextAll("div[id^='modalQuest']").first().modal('show'); 
  });
  
  //click prev
  currentModal.find('.btn-prev').click(function(){
    currentModal.modal('hide');
    currentModal.closest("div[id^='modalQuest']").prevAll("div[id^='modalQuest']").first().modal('show'); 
  });

});