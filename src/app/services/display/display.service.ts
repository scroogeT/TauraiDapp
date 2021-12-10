import {Injectable} from '@angular/core';
import {
  ActionSheetController, AlertController, LoadingController,
  ModalController, ToastController
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private loader: HTMLIonLoadingElement;
  private toast: HTMLIonToastElement;
  isLoading = false;

  constructor(public alertCtrl: AlertController, public loaderCtrl: LoadingController,
              public toastCtrl: ToastController, public modalCtrl: ModalController,
              public actionSheetCtrl: ActionSheetController) {
  }

  async showAlert(header?, subHeader?, message?) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert-class',
      header,
      subHeader,
      message,
      buttons: ['OK']
    });

    await alert.present();

    // const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  async showLoader(message: string = 'Loading...') {
    this.loader = await this.loaderCtrl.create({
      message,
      translucent: true,
      cssClass: 'custom-loading',
      // backdropDismiss: true
    });
    this.isLoading = true;
    await this.loader.present();
  }

  async showToast(message, color?) {
    this.toast = await this.toastCtrl.create({
      message,
      color,
      duration: 10000,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            // console.log('Close clicked');
          }
        }
      ]
    });
    await this.toast.present();
  }

  async showModal(modalPage, fullscreen: boolean, componentProps?) {
    let resolveFunction: (res: any) => void;
    const promise = new Promise<any>(resolve => {
      resolveFunction = resolve;
    });
    const modal = await this.modalCtrl.create({
      component: modalPage,
      cssClass: fullscreen ? 'full-screen-modal' : 'half-screen-modal',
      componentProps
    });

    modal.onDidDismiss().then(res => {
      resolveFunction(res);
    });
    await modal.present();
    return promise;
  }

  async showError(header?, subHeader?, error?) {
    let message = error.message;
    // TODO: HANDLE ALL POSSIBLE ERRORS HERE
    if (error && error.status === 401) {
      message = `${error.error.detail}`;
    } else if (error && error.status === 0) {
      message = 'No Internet Connection';
    } else if (error && error.status === 412){
      message = `${error.error}`;
    }

    const alert = await this.alertCtrl.create({
      cssClass: 'error-alert',
      header,
      subHeader,
      message,
      buttons: ['OK']
    });

    // before showing error make sure all loaders are closed
    if (this.isLoading) await this.closeLoader();
    await alert.present();
  }

  async closeModal(data?) {
    await this.modalCtrl.dismiss(data);
  }

  async closeLoader() {
    this.isLoading = false;
    await this.loader.dismiss();
  }

}
