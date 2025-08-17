import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, FirestoreError } from "firebase/firestore";
import { Tour, tours } from "@/lib/mock-data";

export interface Booking {
  id?: string;
  tourId: string;
  name: string;
  email: string;
  bookingDate: Date;
  tour?: Tour;
}

export async function createBooking(booking: Omit<Booking, 'id' | 'bookingDate' | 'tour'>) {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...booking,
      bookingDate: new Date(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Could not create booking.");
  }
}

export async function getBookingsByEmail(email: string): Promise<Booking[]> {
    try {
        const q = query(collection(db, "bookings"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        const bookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));

        // Attach full tour details to each booking
        return bookings.map(booking => ({
            ...booking,
            tour: tours.find(tour => tour.id === booking.tourId)
        }));

    } catch (e) {
        if (e instanceof FirestoreError) {
            if (e.code === 'permission-denied') {
                console.error("Firestore permission denied. Check your security rules.");
                throw new Error("You do not have permission to view these bookings. Please check your Firestore security rules.");
            }
            if (e.code === 'failed-precondition') {
                console.error("Firestore query requires an index. Please create it in the Firebase console.");
                throw new Error("A database index is required for this query. Please create it in the Firebase console.");
            }
        }
        console.error("Error getting documents: ", e);
        throw new Error("Could not retrieve bookings.");
    }
}
