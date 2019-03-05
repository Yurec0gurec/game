import $ from 'jquery';

const CallMagicTemplate = '<button id="callMagic">Атаковать</button>';

class CallMagic {
  constructor() {
    $('body').prepend(CallMagicTemplate);
    this.self = $('#callMagic');
    this.self.click(() => {
      $('#modal').addClass('flex');
      $('#magic').fadeIn(500);
      this.self.hide();
    });
  }
}

export default CallMagic;
