from time import time
import jwt

from zoomus import ZoomClient
import os


CLIENT_ID = "hl8IN7SzRUKdUPCFqAdWUw"
CLIENT_SECRET = "W3WtSYNWPuG5cTs8hBMH6HN72zF6HC1Z"
ACCOUNT_ID = "PLOjIPLbQnmDloOBjm7TGA"

def create_zoom_meeting(payload):
    """Go to zoom documentation https://developers.zoom.us/docs/meeting-sdk/apis/#operation/meetingCreate"""
    client = ZoomClient(CLIENT_ID, CLIENT_SECRET,   api_account_id=ACCOUNT_ID)
    response = client.meeting.create(**payload)
    return response.json()

def create_auth_signature(meeting_no, role):
    ZOOM_SDK_CLIENT_ID = "UYNhRVI1TmTCd4fX3RzkA"
    ZOOM_SDK_CLIENT_SECRET = "l8nvqZ5h1EPc3j8eO8GRGrxi9EgF5Amm"
    iat = time()
    exp = iat + 60 * 60 * 1  # expire after 1 hour
    oHeader = {"alg": 'HS256', "typ": 'JWT'}
    oPayload = {
        "sdkKey": ZOOM_SDK_CLIENT_ID,
        # The Zoom meeting or webinar number.
        "mn": int(meeting_no),
        # The user role. 0 to specify participant, 1 to specify host.
        "role": role,
        "iat": iat,
        "exp": exp,
        "tokenExp": exp
    }
    jwtEncode = jwt.encode(
        oPayload,
        ZOOM_SDK_CLIENT_SECRET,
        algorithm="HS256",
        headers=oHeader,
    )
    return {'token': jwtEncode, 'sdkKey': ZOOM_SDK_CLIENT_ID}