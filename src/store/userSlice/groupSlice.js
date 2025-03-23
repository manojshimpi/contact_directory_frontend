import { createSlice } from "@reduxjs/toolkit";
import { addGroup, contactAssignToGroup, deleteGroup, fetchGroups, getGrouptByuserId, updateGroup, updateGroupStatus } from "./actionGroup";

const initialState = {
    groups: [],
    loading: false,
    error: null,
    groupsingleRecord: {},
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalContacts: 0,
        limit: 15
    }
}

const groupSlice = createSlice({
        name: 'group',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          // Fetch groups
          builder
            .addCase(fetchGroups.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
              state.loading = false;
              state.groups = action.payload.groups;
              state.pagination = action.payload.pagination;
            })
            .addCase(fetchGroups.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            });
         // Add group
          builder.addCase(addGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addGroup.fulfilled, (state, action) => {
            state.loading = false;
            state.groups.push(action.payload);
          })
          .addCase(addGroup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });

          // update group
          builder.addCase(updateGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateGroup.fulfilled, (state, action) => {
            state.loading = false;
            state.groups.push(action.payload);
          })
          .addCase(updateGroup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });

         // Delete group
         builder.addCase(deleteGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteGroup.fulfilled, (state, action) => {
            state.loading = false;
          })
          .addCase(deleteGroup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });

          builder.addCase(updateGroupStatus.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateGroupStatus.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateGroupStatus.rejected, (state, action) => {
                state.loading = false;
                if (action.payload && action.payload.status) {
                    state.status = action.payload.status;
                } else {
                    state.status = 'error';
                }
                state.error = action.payload ? action.payload.message : 'Failed to update status';
            });

             //Get Single Group
             builder.addCase(getGrouptByuserId.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getGrouptByuserId.fulfilled, (state, action) => {
                state.loading = false;
                state.groupsingleRecord = {...state.groupsingleRecord, ...action.payload};
                state.status = '200';
            })
            .addCase(getGrouptByuserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = action.payload.status;
            });

            // Contact Slice add to group
              builder.addCase(contactAssignToGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(contactAssignToGroup.fulfilled, (state, action) => {
                state.loading = false;
                //state.groups.push(action.payload);
              })
              .addCase(contactAssignToGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });
        },
    });
    
    export default groupSlice.reducer;