import dialogSlice from "../../features/dialogs/dialogsSlice";

describe("Dialogs reducer", () => {
  it("should return the initial state", () => {
    expect(dialogSlice(undefined, {})).toEqual({
      isAddMovieDialogVisible: false,
      isEditMovieDialogVisible: false,
      isDeleteMovieDialogVisible: false,
      editedMovieId: null,
      isMovieInfoMode: false,
      selectedMovieId: null
    });
  });

  it("should handle addMovie open", () => {
    expect(
      dialogSlice(undefined, {
        type: "dialogs/dialogAddMovie",
        payload: "open"
      })
    ).toMatchObject({
      isAddMovieDialogVisible: true
    });
  });

  it("should handle addMovie close", () => {
    expect(
      dialogSlice(
        { isAddMovieDialogVisible: true },
        {
          type: "dialogs/dialogAddMovie",
          payload: "close"
        }
      )
    ).toMatchObject({
      isAddMovieDialogVisible: false
    });
  });

  it("should handle editMovie open", () => {
    expect(
      dialogSlice(undefined, {
        type: "dialogs/dialogEditMovie",
        payload: { operation: "open", id: 10 }
      })
    ).toMatchObject({
      isEditMovieDialogVisible: true,
      editedMovieId: 10
    });
  });

  it("should handle editMovie close", () => {
    expect(
      dialogSlice(
        {
          isEditMovieDialogVisible: true,
          editedMovieId: 10
        },
        {
          type: "dialogs/dialogEditMovie",
          payload: { operation: "close" }
        }
      )
    ).toMatchObject({
      isEditMovieDialogVisible: false,
      editedMovieId: null
    });
  });

  it("should handle deleteMovie open", () => {
    expect(
      dialogSlice(undefined, {
        type: "dialogs/dialogDeleteMovie",
        payload: { operation: "open", id: 10 }
      })
    ).toMatchObject({
      isDeleteMovieDialogVisible: true,
      editedMovieId: 10
    });
  });

  it("should handle deleteMovie close", () => {
    expect(
      dialogSlice(
        {
          isDeleteMovieDialogVisible: true,
          editedMovieId: 10
        },
        {
          type: "dialogs/dialogDeleteMovie",
          payload: { operation: "close" }
        }
      )
    ).toMatchObject({
      isDeleteMovieDialogVisible: false,
      editedMovieId: null
    });
  });

  it("should handle infoMode on", () => {
    expect(
      dialogSlice(undefined, {
        type: "dialogs/infoMode",
        payload: { mode: "on", id: 10 }
      })
    ).toMatchObject({
      isMovieInfoMode: true,
      selectedMovieId: 10
    });
  });

  it("should handle infoMode off", () => {
    expect(
      dialogSlice(
        {
          isMovieInfoMode: true,
          selectedMovieId: 10
        },
        {
          type: "dialogs/infoMode",
          payload: { mode: "off" }
        }
      )
    ).toMatchObject({
      isMovieInfoMode: false,
      selectedMovieId: null
    });
  });
});
