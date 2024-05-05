import { Injectable, effect, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { EMPTY, Observable, map, of, single, switchMap, tap } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  doc,
  DocumentData,
  collectionGroup,
  CollectionReference,
  where,
  docData,
  DocumentReference,
} from '@angular/fire/firestore';
import { CurrentUser } from '@models/user.model';
import { User, user } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { DialogStateService } from './dialog-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Service
  firestore = inject(Firestore);
  authService = inject(AuthService);
  dialogService = inject(DialogStateService);

  // Variables
  currentUser = this.authService.auth_user;
  currentAuthUser$ = this.authService.auth_user$;

  // User collection
  userCollection = collection(this.firestore, 'users');

  doc?: DocumentReference;

  current_user$ = this.currentAuthUser$?.pipe(
    switchMap((auth_user: User | null) => {
      if (auth_user) {
        this.doc = doc(this.firestore, 'users', auth_user.uid);
        return (docData(this.doc) as Observable<User>).pipe(
          switchMap((user) => {
            if (user) {
              return of(user);
            } else {
              return of(null);
            }
          }),
        );
      } else {
        return of(null);
      }
    }),
  ) as Observable<User | null>;
  current_user = toSignal(this.current_user$);

  // Create user
  addUser(user: User): void {
    // addDoc(this.userCollection, user).then((res) => res.id);
  }

  // Read user
  getUser() {}

  // Update user

  // Delete user
}
