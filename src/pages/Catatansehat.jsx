import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { useAuth } from "../AuthContext"; // Ensure useAuth hook is imported

function CatatanSehat() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get token from AuthContext
  const [healthNotes, setHealthNotes] = useState([]); // State to store health notes
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isModalEditOrDelete, setIsModalEditOrDelete] = useState(false); // State to control modal visibility
  const [currentEntryId, setCurrentEntryId] = useState(null);

  const [newNotes, setNewNotes] = useState({
    time_of_day: "",
    health_note_id: 0,
    note: "",
  });

  const handleInputChangeNotes = (e) => {
    const { name, value } = e.target;
    setNewNotes({
      ...newNotes,
      [name]: value,
    });
  };

  const [newNote, setNewNote] = useState({
    date: "",
  });

  useEffect(() => {
    if (user) {
      fetchHealthNotes();
    }
  }, [user]);

  // Function to fetch health notes from the API
  const fetchHealthNotes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/health-notes`, // Correct API endpoint
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`, // Add token to header
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch health notes");
      }

      const data = await response.json();
      setHealthNotes(data); // Store fetched health notes in state
      console.log(data);
    } catch (error) {
      console.error("Error fetching health notes:", error);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ date: value });
  };

  // Handle adding a new note
  const handleAddNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/health-notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error("Failed to add health note");
      }

      const addedNote = await response.json();
      window.location.reload();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding health note:", error);
    }
  };

  const handleDeleteNote = async (timeOfDay, healthNoteId) => {
    let isDelete = confirm("Apakah yakin kamu ingin menghapus catatan?");
    if (isDelete) {
      var response = await fetch(
        `http://localhost:3000/api/health-note-entries/${healthNoteId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
          method: "delete",
        }
      );
      if (response.ok) {
        alert("Success delete notes");
        window.location.reload();
      } else {
        alert("failed delete notes");
      }
    }
  };

  const handleAddOrEditNotes = async (req, res) => {
    var response = await fetch(
      "http://localhost:3000/api/health-note-entries",
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "content-type": "application/json",
        },
        method: "post",
        body: JSON.stringify(newNotes),
      }
    );
    if (response.ok) {
      alert("success add or edit new notes");
      window.location.reload();
    } else {
      alert("failed to add or edit new notes");
    }
  };

  const handleOpenModal = (mealTime, id) => {
    console.log(id);
    setNewNotes({
      ...newNote,
      time_of_day: mealTime,
      note: "",
      health_note_id: id,
    });
    setIsModalEditOrDelete(true);
  };

  const handleAddOrEditNote = async (e) => {
    e.preventDefault();
    if (currentEntryId) {
      console.log("Editing existing entry:", currentEntryId, newNote);
    } else {
      console.log("Adding new entry:", newNotes);
    }

    setIsModalEditOrDelete(false);
    setNewNote({ time_of_day: "", note: "" });
    setCurrentEntryId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-roboto">
      {/* Main Content */}
      <main className="p-8">
        {/* Title Section */}
        <div className="flex items-center space-x-4 mb-8">
          <i
            className="fas fa-arrow-left text-2xl text-green-700 cursor-pointer"
            onClick={() => navigate("/")}
          ></i>
          <h1 className="text-3xl font-bold text-green-700">Catatan Sehat</h1>
        </div>

        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-700 text-white p-2 rounded-md hover:bg-green-600"
          >
            Tambah Catatan
          </button>
        </div>

        <div className="flex overflow-x-auto flex-wrap gap-4">
          {healthNotes.length > 0 ? (
            healthNotes.map((note, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg border border-green-700 w-64"
              >
                <h3 className="text-xl font-bold text-green-700">{note.day}</h3>
                <div className="bg-green-600 text-white p-4">
                  <p className="text-3xl">
                    {format(
                      new Date(note.healthNote.date),
                      "eeee, dd MMMM yyyy"
                    )}
                  </p>{" "}
                </div>
                <ul className="space-y-2 mt-4 p-4">
                  <li>
                    <span className="font-bold">Sarapan: </span>
                    {note.entries.filter(
                      (entry) => entry.time_of_day === "pagi"
                    )[0]?.note || "Belum ada catatan"}
                    <button
                      onClick={() =>
                        handleOpenModal("pagi", note.healthNote.id)
                      }
                      className="text-blue-500 ml-2"
                    >
                      {note.entries.filter(
                        (entry) => entry.time_of_day === "pagi"
                      )[0]?.note
                        ? "Edit Catatan"
                        : "Tambah Catatan"}
                    </button>
                    {note.entries.filter(
                      (entry) => entry.time_of_day === "pagi"
                    )[0]?.note && (
                      <button
                        onClick={() =>
                          handleDeleteNote(
                            "pagi",
                            note.entries.filter(
                              (entry) => entry.time_of_day === "pagi"
                            )[0]?.id
                          )
                        }
                        className="text-red-500 ml-2"
                      >
                        Hapus Catatan
                      </button>
                    )}
                  </li>
                  <li>
                    <span className="font-bold">Siang: </span>
                    {note.entries.filter(
                      (entry) => entry.time_of_day === "siang"
                    )[0]?.note || "Belum ada catatan"}
                    <button
                      onClick={() =>
                        handleOpenModal(
                          "siang",
                          note.entries.filter(
                            (entry) => entry.time_of_day === "siang"
                          )[0]?.id
                        )
                      }
                      className="text-blue-500 ml-2"
                    >
                      {note.entries.filter(
                        (entry) => entry.time_of_day === "siang"
                      )[0]?.note
                        ? "Edit Catatan"
                        : "Tambah Catatan"}
                    </button>
                    {note.entries.filter(
                      (entry) => entry.time_of_day === "siang"
                    )[0]?.note && (
                      <button
                        onClick={() =>
                          handleDeleteNote(
                            "siang",
                            note.entries.filter(
                              (entry) => entry.time_of_day === "siang"
                            )[0]?.id
                          )
                        }
                        className="text-red-500 ml-2"
                      >
                        Hapus Catatan
                      </button>
                    )}
                  </li>
                  <li>
                    <span className="font-bold">Malam: </span>
                    {note.entries.filter(
                      (entry) => entry.time_of_day === "malam"
                    )[0]?.note || "Belum ada catatan"}
                    <button
                      onClick={() =>
                        handleOpenModal("malam", note.healthNote.id)
                      }
                      className="text-blue-500 ml-2"
                    >
                      {note.entries.filter(
                        (entry) => entry.time_of_day === "malam"
                      )[0]?.note
                        ? "Edit Catatan"
                        : "Tambah Catatan"}
                    </button>
                    {note.entries.filter(
                      (entry) => entry.time_of_day === "malam"
                    )[0]?.note && (
                      <button
                        onClick={() =>
                          handleDeleteNote(
                            "malam",
                            note.entries.filter(
                              (entry) => entry.time_of_day === "malam"
                            )[0]?.id
                          )
                        }
                        className="text-red-500 ml-2"
                      >
                        Hapus Catatan
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              Belum ada catatan kesehatan
            </div>
          )}
        </div>
      </main>

      {isModalEditOrDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {currentEntryId
                ? "Edit Catatan Kesehatan"
                : "Tambah Catatan Kesehatan"}
            </h2>
            <form onSubmit={handleAddOrEditNotes}>
              <div className="mb-4">
                <label className="block font-bold">Waktu Makan</label>
                <select
                  name="time_of_day"
                  value={newNotes.time_of_day}
                  onChange={handleInputChangeNotes}
                  className="w-full border border-gray-300 p-2"
                >
                  <option value="">Pilih Waktu Makan</option>
                  <option value="pagi">Pagi</option>
                  <option value="siang">Siang</option>
                  <option value="malam">Malam</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-bold">Catatan</label>
                <input
                  type="text"
                  name="note"
                  value={newNotes.note}
                  onChange={handleInputChangeNotes}
                  className="w-full border border-gray-300 p-2"
                  placeholder="Contoh: Salad"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-700 text-white p-2 rounded-md"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalEditOrDelete(false)}
                  className="bg-gray-300 text-black p-2 rounded-md"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Tambah Catatan Kesehatan</h2>
            <form onSubmit={handleAddNote}>
              {/* Date Picker for Hari */}
              <div className="mb-4">
                <label className="block font-bold">Hari</label>
                <input
                  type="date"
                  name="day"
                  value={newNote.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-700 text-white p-2 rounded-md"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black p-2 rounded-md"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CatatanSehat;
